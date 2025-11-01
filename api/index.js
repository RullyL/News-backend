import express from 'express';
import cors from 'cors';
import articleRoute from '../routes/articleRoute.js';
import categoryRoute from '../routes/categoryRoute.js';

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/articles", articleRoute);
app.use("/api/categories", categoryRoute);

export default app;