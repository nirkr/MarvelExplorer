import { ActorResponse, MovieDetailsResponse } from "../types";
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

export const fetchActorsCharactersPerMovies = async (
  movies: string[]
): Promise<MovieDetailsResponse[]> => {
  const creditPromises = movies.map(async (movieId) => {
    const axiosRequest: AxiosRequestConfig = {
      url: `${BASE_URL}/movie/${movieId}/credits`,
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
      },
    };
    const response = await axios(axiosRequest);
    return response.data;
  });
  
  return await Promise.all(creditPromises);
};
