const express = require("express");
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const routers = require("./routes/authRoutes");
require("dotenv").config();

const socketServer = require("./socketServer");

const PORT = process.env.PORT || process.env.API_PORT;

const app = express();
app.use(express.json());
app.use(cors());
// Registering routes
app.use("/api/auth", routers);

const server = http.createServer(app);
server.listen(PORT, () => {
  console.log(`Server is listening on ${PORT}`);
  socketServer.registerSocketServer(server);
  mongoose
    .connect(process.env.MONGO_URL)
    .then(() => {
      console.log("Mongodb connected");
    })
    .catch((err) => {
      console.error(err);
    });
});
