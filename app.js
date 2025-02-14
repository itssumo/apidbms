import dotenv from 'dotenv';
import express from "express";
import {router} from './routes.js';
dotenv.config();
const port = process.env.PORT;
const app = express();
app.use('/dbmsapi', router);
  //////////////// starts server on port //////////////////////////////
  app.listen(port, () => {
    console.log(`Server started at ${port}`);
  });