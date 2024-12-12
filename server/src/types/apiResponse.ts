type Movie = {
    backdrop_path: string | null;
    id: number;
    title?: string;
    original_title?: string;
    overview: string;
    poster_path: string | null;
    media_type: 'movie' | 'tv';
    adult: boolean;
    original_language: string;
    genre_ids: number[];
    popularity: number;
    release_date?: string; // Optional for TV shows
    video: boolean;
    vote_average: number;
    vote_count: number;
    name?: string; // Optional for TV shows
    original_name?: string; // Optional for TV shows
    first_air_date?: string; // Optional for TV shows
    origin_country?: string[]; // Only for TV shows
  }
  
  type Actor = {
    adult: boolean;
    gender: number; // 0: unspecified, 1: female, 2: male
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null;
    known_for: Movie[];
  }
  
  export type ActorResponse = {
    page: number;
    results: Actor[];
    total_pages: number;
    total_results: number;
  }

  type CastMember = {
    adult: boolean;
    gender: number;  // 0: female, 1: male, 2: non-binary
    id: number;
    known_for_department: string;
    name: string;
    original_name: string;
    popularity: number;
    profile_path: string | null; // The path to the profile picture, might be null if not available
    cast_id: number;
    character: string; // The character they play
    credit_id: string;
    order: number; // Order in the cast list
}

export type MovieDetailsResponse = {
    id: number;
    cast: CastMember[];
}