import express, { Application,Response } from 'express';
import dotenv from 'dotenv';
import { logger } from './midddleware/logger';
import { bookRouter } from './book/book.route';
import cors from 'cors'

dotenv.config();

const app: Application = express();
// const cors = require('cors')

// Basic Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(logger);
app.use(cors())

//default route
app.get('/', (req, res:Response) => {
  res.send("Welcome to Express API Backend WIth Drizzle ORM and PostgreSQL");
});



// Importing user routes
app.use('/api',bookRouter);

const PORT = process.env.PORT || 5000;

//  then start the server

app.listen(PORT, () => {
    console.log(`🚀 Server running on http://localhost:${PORT}`);
 });
  