import { useQuery } from "@tanstack/react-query";
import { fetchActorsCharactersPerMovies } from "../services";

export const useFetchActorsCharactersPerMovies = () => {
  return useQuery({
    queryKey: ["fetchActorsCharactersPerMovies"], 
    queryFn: () => fetchActorsCharactersPerMovies(),
  });
};
