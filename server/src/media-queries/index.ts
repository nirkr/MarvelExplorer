import { ActorMovies } from "./../types";
import { executeQuery } from "./../db/index";

export const insertMoviesPerActor = async (actorMoviesa: ActorMovies) => {
  try {
    const { actor, movies } = actorMoviesa;
    // Begin transaction for batch insertion
    await executeQuery("BEGIN");

    await executeQuery(
      "INSERT INTO actors(actor_id, actor_name) VALUES($1, $2) ON CONFLICT (actor_id) DO NOTHING",
      [actor.id, actor.name]
    );

    for (const movie of movies) {
      await executeQuery(
        "INSERT INTO movies(movie_id, movie_title) VALUES($1, $2) ON CONFLICT (movie_id) DO NOTHING",
        [movie.id, movie.title]
      );
    }

    await executeQuery("COMMIT");
    console.log("Data inserted successfully.");
  } catch (error) {
    // Rollback transaction in case of error
    await executeQuery("ROLLBACK");
    console.error("Error inserting data:", error);
  }
};
