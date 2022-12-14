const mongoose = require("mongoose");
// const config = require("../../config/mongoConfig.json");
require("dotenv").config();

module.exports = mongoose
  .connect(process.env.DB_HOST)
  // .connect(`mongodb://${config.development.host}:${config.development.port}/${config.development.database}`)
  .then(() => {
    console.log("mongodb run");
  })
  .catch((err: Error) => {
    console.log(err);
    process.exit(1);
  });




