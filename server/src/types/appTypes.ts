export type ControllerResponse<T> = {
  status: number;
  data?: T;
  error?: Error;
};

export type Movie = {
  id: number
  title: string
}

export type ActorMovies = {
  actor: Actor
  movies: Movie[];
};

export type MultipleMatches = {
  actors: ActorWithMultipleCharacters[];
  characters: CharacterWithMultipleActors[];
};

// helper types

type Actor = {
  id: number
  name: string
}

type MovieCharacter = {
  movieId: number; 
  name: string;
  character: string;
};


 type MovieActor = {
  name: string;
  actor: string;
};


type ActorWithMultipleCharacters = {
  actor: string;
  movieCharacters: MovieCharacter[];
};


type CharacterWithMultipleActors = {
  character: string;
  movieActors: MovieActor[];
};
