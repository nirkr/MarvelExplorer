import { DEPARTMENT, moviesListExample } from "../constants";
import { MovieDetailsResponse } from "../types";

// will manipulate the movies credits metadata => return maps of movies/characters per actors + movies/actors per characters
export const findActorsWithMultipleCharacters = (movies: MovieDetailsResponse[]) => {
    const actorMap = new Map();
    const characterMap = new Map();

    movies.forEach(movie => {
        movie.cast
        .filter((actor) => actor.known_for_department === DEPARTMENT)
        .forEach(castMember => {
            const {id: actorId, name: actorName} = castMember;
            const characterName = castMember.character;

            // If actor already exists, add the new character and movie
            if (!actorMap.has(actorId)) {
                actorMap.set(actorId, { name: actorName , movieCharacters: new Set() });
            }
            // If charchter already exists, add the new actor and movie
             if (!characterMap.has(characterName)) {
                characterMap.set(characterName, { movieActors: new Set()});
            }

            const actorDetails = actorMap.get(actorId);
            actorDetails.movieCharacters.add({movieId: movie.id, name: moviesListExample[movie.id], character: castMember.character}); 
            
            const characterDetails = characterMap.get(characterName)
            characterDetails.movieActors.add({name: moviesListExample[movie.id], actor: castMember.name}); 
        });
    });  
    return {actorMap, characterMap}
};