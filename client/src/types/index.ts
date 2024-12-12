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
  