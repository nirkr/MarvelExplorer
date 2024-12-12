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
  

export type MultipleMatches = {
  actors: ActorWithMultipleCharacters[];
  characters: CharacterWithMultipleActors[];
};

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
