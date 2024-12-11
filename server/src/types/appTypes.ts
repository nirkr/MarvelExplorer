export type ControllerResponse<T> = {
  status: number;
  data?: T;
  error?: Error;
};

export type ActorMovies = {
  actorName: string
  movies: string[];
};

type MovieCharacterObj = {
  movieName: string;
  actorName: string;
};
type MovieActorObj = {
  movieName: string;
  actorName: string;
};

export type ActorMovieCharacters = { // characters per actor
  actorName: MovieCharacterObj[];
};
export type CharcterMovieActors = { // actors per character
  characterName: MovieActorObj[];
};
