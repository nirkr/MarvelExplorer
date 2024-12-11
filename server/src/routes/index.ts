import express, { Request, Response } from 'express';
import { getMoviesPerActor } from "../controllers";

const router = express.Router();

router.get("/moviesPerActor", async (req: Request, res: Response) => {
const { q: actorNames }  = req.query
  const response = await getMoviesPerActor([actorNames] as string[])
  res.status(response.status).send(response.data) // Placeholder
});

router.get("/actorsWithMultipleCharacters", (req: Request, res: Response) => {
  // Implementation to fetch actors with multiple characters
  res.json({}); // Placeholder
});

router.get("/charactersWithMultipleActors", (req: Request, res: Response) => {
  // Implementation to fetch characters with multiple actors
  res.json({}); // Placeholder
});

export { router as moviesRouter };
