const express = require("express");
const app = express();
const open = require("open"); // module not workign when push to heroku  ?
// temp solution is to move the code to front end so that we have access to the window object

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
      socket.emit("bot message", {
        msg: "Here is a blog post you might like",
        link: "https://zerotomastery.io/blog/learn-to-code-for-free",
      });

      // open("https://zerotomastery.io/blog/learn-to-code-for-free", {
      //   wait: true,
      // });
    }

    if (text.includes("get hired")) {
      socket.emit("bot message", {
        msg: "Here is a career guide you might like",
        link: "https://zerotomastery.io/career-paths/i-just-want-to-get-hired",
      });
    }

    if (text.includes("get started")) {
      socket.emit("bot message", {
        msg: "Let's find your career path together!",
        link: "https://zerotomastery.io/tech-career-path-quiz/",
      });
    }
    if (text.includes("web 3")) {
      socket.emit("bot message", {
        msg: "Here is a course you might like",
        link: "https://zerotomastery.io/courses/introduction-to-web3/",
      });
    }
    if (text.includes("developer")) {
      // emit result back to the browser
      socket.emit("bot message", {
        msg: "You might want to check out different career paths on Zero to Mastery",
        link: "https://zerotomastery.io/career-paths/",
      });

      // open("https://zerotomastery.io/career-paths/", { wait: true });
    }
  });
});
app.get("/", (req, res) => {
  res.sendFile("index.html");
});
