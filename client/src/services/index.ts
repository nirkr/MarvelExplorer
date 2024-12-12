import axios from "axios";
import { ActorMovies, MultipleMatches } from "../types";

const BASE_URL = `${process.env.REACT_APP_SERVER_HOST}:${process.env.REACT_APP_SERVER_PORT}`;

export const fetchMoviesPerActor = async (
  actorName: string
): Promise<ActorMovies> => {

  try {
    const response = await axios.get(
      `${BASE_URL}/moviesPerActor?q=${actorName}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching movies:", error);
    throw error;
  }
};
export const fetchActorsCharactersPerMovies =
  async (): Promise<MultipleMatches> => {
    try {
      const response = await axios.get(
        `${BASE_URL}/actorsWithMultipleCharacters`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching movies:", error);
      throw error;
    }
  };
