import { HttpStatusCode } from "axios";
import { insertMoviesPerActor } from "../media-queries";
import { fetchMoviesPerActor } from "../services";
import { ControllerResponse, ActorMovies, Movie } from "../types/appTypes";

const DEPARTMENT = "Acting";

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
