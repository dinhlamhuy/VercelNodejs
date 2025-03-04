const express = require("express");
require("express-async-errors");
const dotenv = require("dotenv");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const cors = require("cors");
const path = require("path");
const http = require("http"); // Import http module

dotenv.config();

const app = express();
app.use(express.static(path.join(__dirname, "build")));
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());
let users = [
    { id: "1", name: "Hui", email: "hui@example.com" },
    { id: "2", name: "John", email: "john@example.com" },
  ];
  
  // Lấy danh sách người dùng
  app.get("/api/users", (req, res) => {
    res.json(users);
  });
  

const server = http.createServer(app); // Tạo server HTTP từ Express app
server.listen(process.env.PORT, () => {
  console.log(`Express running → PORT ${server.address().port}`);
});

const io = require("socket.io")(server, {
  cors: {
    origin: "*",
    methods: ["POST", "GET"],
    credentials: true
  },
});

io.sockets.on("connection", function (socket) {
  console.log("client connected", socket.id);

  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

app.set("etag", "strong");
