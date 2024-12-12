import { ActorResponse } from "../types";
import axios, { AxiosRequestConfig } from "axios";

const BASE_URL = "https://api.themoviedb.org/3";

export const fetchMoviesPerActor = async (
  actorName: string
): Promise<ActorResponse> => {
  // TODO: pagination

  const axiosRequest: AxiosRequestConfig = {
    url: `${BASE_URL}/search/person?query=${actorName}`,
    headers: {
      Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
    },
  };
  const res = await axios(axiosRequest);
  return res.data;
};

// https://api.themoviedb.org/3/person/{person_id}/movie_credits
