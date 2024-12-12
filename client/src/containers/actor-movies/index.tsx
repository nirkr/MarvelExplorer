import React, { useState } from "react";
import { useFetchActorMovies } from "../../hooks/useFetchActorMovies";
import { List, ListItem, ListItemText, Grid2, Paper, Typography } from "@mui/material";
import * as styled from './actorMovies.styled';
import { actorListMock } from "../../constants/data";

export const ActorMovies = () => {
  const [selectedActor, setSelectedActor] = useState("");
  const { data, isLoading } = useFetchActorMovies(selectedActor);

  return (
    <styled.ContainerWrapper>
      <Grid2 container spacing={2}>
        {/* Left Column: Actor List */}
        <Grid2> {/* Adjust column width as needed */}
          <Paper style={{ padding: '16px', maxHeight: '400px', overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom >
              Select an Actor
            </Typography>
            <List>
              {actorListMock.map((actorName) => (
                <ListItem key={actorName} onClick={() => setSelectedActor(actorName)}>
                  <ListItemText primary={actorName} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid2>

        
        <Grid2> 
          <Paper style={{ padding: '16px', maxHeight: '400px', overflowY: 'auto' }}>
            <Typography variant="h6" gutterBottom>
             {selectedActor ? `Movies for ${selectedActor}` : "Select an Actor"}
            </Typography>
            {isLoading ? (
              <div>Loading....</div>
            ) : (
              <List>
                {data && data.movies.length > 0 ? (
                  data.movies.map((movie) => (
                    <ListItem key={movie.id}>
                      <ListItemText primary={movie.title} />
                    </ListItem>
                  ))
                ) : (
                  selectedActor && <div>No movies found for this actor.</div>
                )}
              </List>
            )}
          </Paper>
        </Grid2>
      </Grid2>
    </styled.ContainerWrapper>
  );
};