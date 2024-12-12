import { HttpStatusCode } from "axios";
import express, { Request, Response } from "express";
import { moviesListExample } from "../constants";
import { getActorsCharactersPerMovies, getMoviesPerActor } from "../controllers";
import { actorQuerySchema } from "../validations";

const router = express.Router();

router.get("/moviesPerActor", async (req: Request, res: Response) => {
  const { error } = actorQuerySchema.validate(req.query);
  if (error) {
    res.status(HttpStatusCode.BadRequest).send(error);
    return
  }
  const { q: actorName } = req.query;
  const response = await getMoviesPerActor(actorName as string);
  res.status(response.status).send(response.data || response.error);
});

router.get(
  "/actorsWithMultipleCharacters",
  async (req: Request, res: Response) => {
    const response = await getActorsCharactersPerMovies(Object.keys(moviesListExample));
    res.status(response.status).send(response.data || response.error);
  }
);

export { router as moviesRouter };
