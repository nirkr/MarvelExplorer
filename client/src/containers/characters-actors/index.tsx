import React from "react";
import {
  List,
  ListItem,
  ListItemText,
  Typography,
  Paper,
  Divider,
} from "@mui/material";
import * as styled from '../multiList.styled'
import { useFetchActorsCharactersPerMovies } from "../../hooks/useFetchActorsCharactersPerMovies";

export const CharactersWithActors = () => {
  const { data, isLoading } = useFetchActorsCharactersPerMovies();
  return isLoading ? (
    <div> Loading....</div>
  ) : (
    <Paper style={{ padding: "16px" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Actors per Character
      </Typography>
      <List>
        {data?.characters.map(
          (characterObj) =>
            characterObj.movieActors.length > 0 && ( // dont show characters with no multiple actors
              <div key={characterObj.character}>
                <ListItem>
                  <ListItemText
                    primary={
                      <span>
                        <styled.PrimaryLabel>{characterObj.character}</styled.PrimaryLabel>
                      </span>
                    }
                  />
                </ListItem>
                <List component="div" disablePadding>
                  {characterObj.movieActors.map((movieActor, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={<strong>{movieActor.actor}</strong>}
                        secondary={`in "${movieActor.name}"`} 
                      />
                    </ListItem>
                  ))}
                </List>
                <Divider style={{ margin: "8px 0" }} />
              </div>
            )
        )}
      </List>
    </Paper>
  );
};
