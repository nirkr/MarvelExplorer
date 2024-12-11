-- Create the actors table
CREATE TABLE IF NOT EXISTS actors (
    actor_id INT PRIMARY KEY,
    actor_name VARCHAR(255) NOT NULL
);

-- Create the movies table
CREATE TABLE IF NOT EXISTS movies (
    movie_id INT PRIMARY KEY,
    movie_name VARCHAR(255) NOT NULL,
    release_year INT
);

-- Create the characters table
CREATE TABLE IF NOT EXISTS characters (
    character_id SERIAL PRIMARY KEY,
    character_name VARCHAR(255) NOT NULL
);

-- Create the movie_actor_character linking table
CREATE TABLE IF NOT EXISTS movie_actor_character (
    id SERIAL PRIMARY KEY,
    movie_id INT REFERENCES movies(movie_id) ON DELETE CASCADE,
    actor_id INT REFERENCES actors(actor_id) ON DELETE CASCADE,
    character_id INT REFERENCES characters(character_id) ON DELETE CASCADE
);
