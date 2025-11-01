import express from 'express';
import cors from 'cors';
import articleRoute from './routes/articleRoute.js';
import categoryRoute from './routes/categoryRoute.js';

const app = express();
app.use(cors())
app.use(express.json())
app.use(articleRoute);
app.use(categoryRoute);

app.listen(5000, () => {
  console.log('Server is running on port 5000');
});