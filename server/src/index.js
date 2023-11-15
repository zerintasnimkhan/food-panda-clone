const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const config = require('./config');
const Router = require('./routers/router');
const loginrouter = require('./routers/router');
const registerrouter = require('./routers/router');

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/', Router);

app.use('/login', loginrouter);
app.use('/register', registerrouter);


(async function () {
      try {
            await mongoose.connect(config.MONGOOSE_URI);
            console.log('[mongoose]: Connected to DB.');
            app.listen(config.PORT, () => console.log(`[server]: Server is listening on port ${config.PORT}`));
      } catch (error) {
            console.log(error);
      }
})();