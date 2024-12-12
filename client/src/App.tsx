import React from "react";
import * as styled from "./App.styled";
import { ActorMovies } from "./containers/actor-movies";
import { ActorWithCharacters } from "./containers/actors-characters";
import { CharactersWithActors } from "./containers/characters-actors";

function App() {
  return (
    <styled.appWraper>
      <h1> Marvel Explorer </h1>
      <ActorMovies />
      <styled.combinationListWraper>
        <ActorWithCharacters />
        <CharactersWithActors />
      </styled.combinationListWraper>
    </styled.appWraper>
  );
}

export default App;
