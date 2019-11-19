const express = require("express");
const connectDB = require("./config/db");

const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const authRouter = require("./routes/authRouter");
const socketController = require("./controllers/socketController");

const app = express();
const server = http.createServer(app);
io = socketio(server);

//Connect to database
connectDB();

//Init middleware
app.use(express.json({ extended: false }));
app.use(cookieParser());
dotenv.config();
app.use(cors());

app.use("/auth", authRouter);
//Socket
io.on("connection", socket => {
  console.log("connected");
  socket.on("create channel", async channelObj => {
    console.log(channelObj);
    let newChannel = await socketController.createChanel(channelObj);
    if (newChannel) {
      io.emit("new channel", newChannel);
    }
  });
});

const { port } = require("./config/config");

server.listen(port, () => console.log(`Server started on ${port}`));

module.exports = server;
