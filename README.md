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
   docker-compose up --build

3. **Access the Application**:
- **Frontend**: Visit `http://localhost:3000` in your web browser to access the user interface.
- **Backend**: API endpoints are available at `http://localhost:5000`.

## Technology Stack
- **Database**: 
    -  PostgreSQL
    -  init.sql file - there will be the commands for creating the DB tables
- **Backend**: 
    - Node.js with Express
    - Typescript - enforce clear types for 3rd party api response types, our server's responses types etc, in addition to enable easy and clear future coding 
    - Validation - using joy library `??`
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
- `???? CACHING`
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

    - logging - would implement winston logger to handle logs of the operations
    - DB insertions 
        - if value(movie/actor/character) exists, ON CONFLICT DO NOTHING
    - each controller request will return object of { status, data, error }

3. **Caching Considerations**:
- A caching layer could be added (e.g., using Redis) to improve performance by storing frequently requested data temporarily, reducing database load and API calls.

4. **API Performance and Limitations**:
- The application is designed to minimize load on the TMDB API in order to elimainte the rate limit of the API. That will be by:
    -  caching results where feasible and using database storage for repeated queries
    -  reducing request amount by using the relevant api requests, while matching the application requirements (show the relations of movies / actors / characters )

5. **Frontend assumptions**:
    - handling isLoading for api requests - FUTURE => create isLoading Progress component to render for case of waiting for data from the server

6. **Frontend-Backend Interaction**:
- using use-query infra - for cached requests
- FUTURE - in manner of can create one place for mutual types, and then both server and client can use the very same type (such as ActorMovies)

7. **Extensibility**: `?????`
- The application is architected with scalability in mind, allowing future expansion, such as supporting a larger dataset or adding more features, to be more straightforward.

8. **Dockerization**:
- The app is dockerized and easy to install and use on various machines. these are the docker containers:
    - client service
    - server service
    - postgress database
all is maintained and built easily running the docker-compose orchestrator

9. **Deployment** - options for FUTURE
    - ci/cd - manage deployment pipelines
    - manage env vars in github actions
