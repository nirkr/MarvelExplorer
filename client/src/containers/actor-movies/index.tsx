import React, { useState } from "react";
import { useFetchActorMovies } from "../../hooks/useFetchActorMovies";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import { actorListMock } from "../../constants/data";

export const ActorMovies = () => {
  const [selectedActor, setSelectedActor] = useState('');
  const { data, isLoading } = useFetchActorMovies(selectedActor);

  const handleActorSelection = (actorName: string) => {
    setSelectedActor(actorName);
};

  return isLoading ? (
    <div> Loading.... </div>
  ) : (
    <>
    
    <ul>
      {actorListMock.map((actor) => (
        <li onClick={()=>handleActorSelection(actor)}> {actor}</li>
      ))}
    </ul>
     <div>
     {data && data?.movies?.map((movie) => (
         <div key={movie.id}>{movie.title}</div>
     ))}
 </div>
    </>
  );
};
