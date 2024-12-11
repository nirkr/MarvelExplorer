import exress from 'express'
import dotenv from 'dotenv';
import { moviesRouter } from './routes'

dotenv.config();

const app = exress();
const PORT = process.env.PORT || 5000;

app.use(moviesRouter)

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});