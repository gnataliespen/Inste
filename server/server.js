const express = require("express");
const connectDB = require("./config/db");

const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const cors = require("cors");
const http = require("http");
const socketio = require("socket.io");
const authRouther = require("./routes/authRouter");
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

app.use("/auth", authRouther);
//Socket
io.on("connection", socket => {
  console.log("connected");
});

const { port } = require("./config/config");

server.listen(port, () => console.log(`Server started on ${port}`));

module.exports = server;
