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

export const ActorWithCharacters = () => {
  const { data, isLoading } = useFetchActorsCharactersPerMovies();

  return isLoading ? (
    <div>Loading....</div>
  ) : (
    <Paper style={{ padding: "16px" }}>
      <Typography variant="h5" component="h2" gutterBottom>
        Characters per Actor
      </Typography>
      <List>
        {data?.actors.map(
          (actor) =>
            actor.movieCharacters.length > 0 && ( // dont show actors with no multiple characters
              <div key={actor.actor}>
                <ListItem>
                  <ListItemText primary={<styled.PrimaryLabel>{actor.actor}</styled.PrimaryLabel>} />
                </ListItem>
                <List component="div" disablePadding>
                  {actor.movieCharacters.map((character, index) => (
                    <ListItem key={index}>
                      <ListItemText
                        primary={<strong>{character.character}</strong>}
                        secondary={`in "${character.name}"`}
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
