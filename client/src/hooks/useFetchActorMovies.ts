import { useQuery } from "@tanstack/react-query";
import { fetchMoviesPerActor } from "../services";

export const useFetchActorMovies = (actorName: string) => {
  return useQuery({
    queryKey: ["fetchMoviesPerActor", actorName] , // caching key will be the actorName
    queryFn: ()=>fetchMoviesPerActor(actorName),
    enabled: !!actorName
  });
};
