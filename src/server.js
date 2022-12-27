const app = require("./app");
const mongoose = require("./dbMongo/mongoose/mongoose");

const PORT = process.env.PORT || 80;
const server = async () => {
  try {
    await mongoose;
    app.listen(PORT, () => {
      console.log("server is up");
    });
  } catch (error) {
    console.log(error);
  }
};
server();
