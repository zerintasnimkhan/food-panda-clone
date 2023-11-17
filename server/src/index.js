const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const config = require("./config");
const bodyParser = require("body-parser");
const categoryRouter = require("./routers/category.router");
const orderRouter = require("./routers/order.router");
const restaurantRouter = require("./routers/restaurant.router");
const foodRouter = require("./routers/food.router");
const Router = require("./routers/router");
const loginrouter = require("./routers/router");
const registerrouter = require("./routers/router");
const registerRestaurant = require("./routers/router");
const router = express.Router();
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/", Router);

app.use("/category", categoryRouter);
app.use("/order", orderRouter);
app.use("/restaurant", restaurantRouter);
app.use("/food", foodRouter);

(async function () {
  try {
    await mongoose.connect(config.MONGOOSE_URI);
    console.log("[mongoose]: Connected to DB.");
    app.listen(config.PORT, () =>
      console.log(`[server]: Server is listening on port ${config.PORT}`)
    );
  } catch (error) {
    console.log(error);
  }
})();
