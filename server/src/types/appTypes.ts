export type ControllerResponse<T> = {
  status: number;
  data?: T;
  error?: Error;
};

export type Actor = {
  id: number
  name: string
}
export type Movie = {
  id: number
  title: string
}

export type ActorMovies = {
  actor: Actor
  movies: Movie[];
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
