import { HttpStatusCode } from "axios";
import { fetchMoviesPerActor } from "../services";
import { ControllerResponse, ActorMovies } from "../types/appTypes";

export const getMoviesPerActor = async (
  actorNames: string[]
): Promise<ControllerResponse<ActorMovies[]>> => {
  try {
    const res = await fetchMoviesPerActor(actorNames);
    const parsedRes: ActorMovies[] = res.map((actorMovies) => {
      return {
        actorName: actorMovies.results[0].name,
        movies: actorMovies.results[0].known_for
          ?.map((movie) => movie.title)
          ?.filter((title): title is string => title !== undefined),
      };
    });

    return { data: parsedRes, status: HttpStatusCode.Ok };
  } catch (error: any) {
    return { error: error.message, status: HttpStatusCode.InternalServerError };
  }
};
