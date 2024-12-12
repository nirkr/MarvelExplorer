import { HttpStatusCode } from "axios";
import { DEPARTMENT } from "../constants";
import { insertMoviesActorsCharacters, insertMoviesPerActor } from "../media-queries";
import {
  fetchActorsCharactersPerMovies,
  fetchMoviesPerActor,
} from "../services";
import {
  ControllerResponse,
  ActorMovies,
  Movie,
  MultipleMatches,
} from "../types/appTypes";
import { findActorsWithMultipleCharacters } from "../utils";

export const getMoviesPerActor = async (
  actorName: string
): Promise<ControllerResponse<ActorMovies>> => {
  try {
    const res = await fetchMoviesPerActor(actorName);
    // when we look actor by name, might be several matches. I make assumption by retrieving the most popular option for the input actorName
    // error handling - based that 3rd api returns results object. optional will be on the movies object for the actor. for other behaviour the app will go to catch section and return 500
    const mostPopularActor = res.results
      .filter((actor) => actor.known_for_department === DEPARTMENT)
      .reduce((prev, current) => {
        return current.popularity > prev.popularity ? current : prev;
      }, res.results[0]);
    const mappedMoviesPerActor: ActorMovies = {
      actor: {
        id: mostPopularActor.id,
        name: mostPopularActor.name,
      },
      movies:
        mostPopularActor.known_for
          ?.map((movie) => {
            return {
              id: movie.id,
              title: movie.title,
            };
          })
          ?.filter((movie): movie is Movie => movie.id !== undefined) || [],
    };

    await insertMoviesPerActor(mappedMoviesPerActor);
    return { data: mappedMoviesPerActor, status: HttpStatusCode.Ok };
  } catch (error: any) {
    return { error: error.message, status: HttpStatusCode.InternalServerError };
  }
};

export const getActorsCharactersPerMovies = async (
  movies: string[]
): Promise<ControllerResponse<MultipleMatches>> => {
  try {
    const movieDetails = await fetchActorsCharactersPerMovies(movies);
    // actorMap plays here in two tasks: 1. find the multiple character matches 2. have all the ids for writing to the DB
    const { actorMap, characterMap } =
      findActorsWithMultipleCharacters(movieDetails);

    const actorsWithMultipleCharacters = [...actorMap].reduce(
      (acc, [_actorName, details]) => {
        if (details.movieCharacters.size > 1) {
          acc.push({
            actor: details.name,
            movieCharacters: Array.from(details.movieCharacters),
          });
        }
        return acc;
      },
      [] as any
    );

    const charactersWithMultipleActors = [...characterMap].reduce(
      (acc, [character, details]) => {
        if (details.movieActors.size > 1) {
          acc.push({ character, movieActors: Array.from(details.movieActors) });
        }
        return acc;
      },
      [] as any
    );

    const fomattedResponse: MultipleMatches = {
      actors: actorsWithMultipleCharacters,
      characters: charactersWithMultipleActors,
    };
    
    // await insertMoviesActorsCharacters(actorMap) => need to write to DB (to the 4 tables , including the linked table)
    return { status: HttpStatusCode.Ok, data: fomattedResponse };
  } catch (error: any) {
    return { error: error.message, status: HttpStatusCode.InternalServerError };
  }
};
