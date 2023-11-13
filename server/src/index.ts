import express, { Express } from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import config from './config';

const app : Express = express();

app.use(cors());
app.use(express.json());

(async function () {
      try {
            await mongoose.connect(config.MONGOOSE_URI);
            console.log('[mongoose]: Connected to DB.');
            app.listen(config.PORT, () => console.log(`[server]: Server is listening on port ${config.PORT}`));
      } catch (error) {
            console.log(error);
      }
})();