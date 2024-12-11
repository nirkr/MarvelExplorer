import { HttpStatusCode } from "axios";
import { fetchMoviesPerActor } from "../services";
import { ControllerResponse, ActorMovies } from "../types/appTypes";

export const getMoviesPerActor = async (
  actorName: string
): Promise<ControllerResponse<ActorMovies[]>> => {
  try {
    const res = await fetchMoviesPerActor(actorName);
    const parsedRes: ActorMovies[] = res.map((actorMovies) => {
      // when we look actor by name, might be several matches. I make assumption by retrieving the most popular option for the input actorName
      const mostPopularActor = actorMovies.results.reduce((prev, current) => {
        return current.popularity > prev.popularity ? current : prev;
      });
      return {
        actorName: mostPopularActor.name,
        movies: mostPopularActor.known_for
          ?.map((movie) => movie.title)
          ?.filter((title): title is string => title !== undefined),
      };
    });

    return { data: parsedRes, status: HttpStatusCode.Ok };
  } catch (error: any) {
    return { error: error.message, status: HttpStatusCode.InternalServerError };
  }
};
