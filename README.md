# Marvel Movie Data Explorer

## Project Overview
The Marvel Movie Data Explorer is a web application designed to explore Marvel movies data. It uses the TMDB (The Movie Database) API to fetch data about Marvel movies, actors, and characters, answering specific questions such as what movies each actor has appeared in, which actors have played multiple characters, and which characters have been portrayed by multiple actors. The application includes both backend and frontend components, demonstrating a full-stack application with a focus on extensibility and performance.

## Setup Instructions

### Prerequisites
- **Docker** and **Docker Compose**: Ensure Docker is installed and running on your development machine.

### Running the Application
1. **Clone the Repository**:
   git clone git@github.com:nirkr/MarvelExplorer.git
   cd MarvelExplorer

2. **Build and Start Services**: 
- Build and start all services:
   - docker-compose up --build
- install dependencies locally:
    - chmod +x install-dependencies.sh
    - ./install-dependencies.sh

3. **Set env varibles** - create .env file in the root level of the project. here are the env vars:
- SERVER_PORT=5000
- TMDB_TOKEN=eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmYmY4MGZkNDk2ZTNiNTJjYzg2ZmYyM2U5ZGFlNThhZSIsIm5iZiI6MTczMzgyNjk0Ni40MjEsInN1YiI6IjY3NTgxOTgyMTU0NDIwMTFmZmU4MjA3YyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.tC8Q_bosTTEnkZkKQKzvnb3GcWy52cPQFGH6G48eIW4
- DB_HOST=db
- DB_USER=root
- DB_PASSWORD=root
- DB_DATABASE=postgres
- DB_PORT=5432
- REACT_APP_SERVER_HOST=http://localhost
- REACT_APP_SERVER_PORT=5000`

4. **Access the Application**:
- **Frontend**: Visit `http://localhost:3000` in your web browser to access the user interface.
- **Backend**: API endpoints are available at `http://localhost:5000`.

## Technology Stack
- **Database**: 
    -  PostgreSQL
    -  init.sql file - there will be the commands for creating the DB tables
- **Backend**: 
    - Node.js with Express
    - Typescript - enforce clear types for 3rd party api response types, our server's responses types etc, in addition to enable easy and clear future coding 
    - Input validation - using joy library - verify query string is passed to the endpoint's logics
    - use SQL TRANSACTIONS for multiple sql commands for single api request - to handle data consistency also in case of operation failure
    - error handling: each controller request will return object of { status, data, error }
      each controller will collect the potential error from the components invoked (service calls to TMDB , requests to DB etc) => will return the error
- **Frontend**: 
    - React.js
    - TypeScript - same reasons as backend. both frontend and backend use similar types and promise responses help create strong front-back end interfaces
    - react-query - using useQuery for HTTP requests to the server - enable request caching
    - css framework - stiches library (works like styled-components)
    - component library - material UI - work with prepared components (button, list etc.)
- **Containerization**: Docker and Docker-Compose

## Assumptions and Design Decisions

1. **Data Fetching Strategy**:
- The application fetches data from the TMDB API and stores it in a PostgreSQL database. 
- `Future feature` - `Caching` - any request will search the relevant data in the cache. will save requests to the API. any request to the API will update the cache and the DB
- the back-end serves the ui by the requests get from the front-end (actors/movies/characters)

2. **Database Schema Overview**:

The database consists of three main tables and one linking table:

a. **Actors Table**: actor information( id, name).
b. **Movies Table**: details about movies (id, name, year).
c. **Characters Table**: Contains character information (id, name).
d. **Movie_Actor_Character Table** establishes a `many-to-many` relationship between actors, movies, and characters. 
    using `ON DELETE CASCADE` feature, to ensures that when a record in the primary tables is deleted, all related records in the linking table are automatically removed for consistency.

3. **Backend assumptions**:
    - movies per actor - passing actor name as query string to fetch the movies per actor
        - In the future can enhance the api to support multiple actors in the input
        - If there is multiple matches for the specific actor name => fetch the most popular one (based on the popularity attribute in the api response)
        - the api returns pageIds:
            - need to batch the responses from all the pages retured from the response
            - can set pagination mechanism for front-end performance
    - multi instances endpoint:
        - because the front consumes both lists on mount, i return the two lists in same endpoint: saves calls to the API
        - character information is available only by movieId/personId , causing in scale for multiple api requests. => will need to comply with the api ratelimit (for example offline job which will persist digested data by bulks for runtime applicatio requests)
    - more api params (such as language) - i dont pass that, use default api values
    - logging - would implement winston logger to handle logs of the operations
    - DB insertions 
        - if value(movie/actor/character) exists, ON CONFLICT DO NOTHING
        - didnt have the time to finish to write the combinations to linked table - i put in the code comments mentioning that
    
4. **Caching Considerations**:
- As said, a caching layer could be added (e.g., using Redis) to improve performance by storing frequently requested data temporarily, reducing database load and API calls.

5. **API Performance and Limitations**:
- The application is designed to minimize load on the TMDB API in order to elimainte the rate limit of the API. That will be by:
    -  caching - will reduce request amount for repeated queries
    -  According the API documentation, the rate limit is 50 requests per second range - for the relevant cases the app will need to cope with that limit

6. **Frontend assumptions**:
    - handling isLoading for api requests - FUTURE => create isLoading Progress component to render for case of waiting for data from the server
    - some of the styling was built in inline styling - didnt have the time to set all styling in organized .styled.ts files

7. **Frontend-Backend Interaction**:
- using use-query infra - for cached requests
- FUTURE - in manner of can create one place for mutual types, and then both server and client can use the very same type (such as ActorMovies)

8. **Dockerization**:
- The app is dockerized and easy to install and use on various machines. these are the docker containers:
    - client service
    - server service
    - postgress database
all is maintained and built easily running the docker-compose orchestrator

9. **Deployment** - options for FUTURE
    - ci/cd - manage deployment pipelines
    - manage env vars in github actions - right now i added that in the `Running the Application` section