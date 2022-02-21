const express = require("express");
const app = express();
const open = require("open"); // module not workign when push to heroku ?

app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

const port = process.env.PORT || 3000;

const server = app.listen(port, function () {
  console.log("server is listening on port " + port);
});

const io = require("socket.io")(server);

io.on("connection", function (socket) {
  socket.on("user message", (text) => {
    if (text.includes("code") || text.includes("learn")) {
      // emit result back to the browser
      socket.emit("bot message", "Here is a blog post you might like");

      open("https://zerotomastery.io/blog/should-i-learn-to-code", {
        wait: true,
      });
      return;
    }

    if (text.includes("time")) {
      const date = new Date();
      const hr = date.getHours();
      const min = date.getMinutes();
      let displayMin = min < 10 ? "0" + min : min;
      let displayTime =
        hr > 12 ? `${hr - 12}:${displayMin} PM` : `${hr}:${displayMin} AM`;
      socket.emit("bot message", `Right now it is ${displayTime}`);
    }
    if (text.includes("developer")) {
      // emit result back to the browser
      socket.emit(
        "bot message",
        "You might want to check out different career paths on Zero to Mastery"
      );

      open("https://zerotomastery.io/career-paths/", { wait: true });
    }
  });
});
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
