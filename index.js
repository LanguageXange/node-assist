const express = require("express");
const app = express();
app.use(express.static(__dirname + "/public"));
app.use(express.static(__dirname + "/views"));

const port = process.env.PORT || 3000;
const server = app.listen(port, function () {
  console.log("server is listening on port " + port);
});

app.get("/", (req, res) => {
  res.sendFile("index.html");
});

const io = require("socket.io")(server);

// hardcoded keywords
const keywordList = [
  {
    keyword: "code",
    msg: "Here is a blog post you might like",
    link: "https://zerotomastery.io/blog/learn-to-code-for-free",
  },
  {
    keyword: "get hired",
    msg: "Here is a career guide you might like",
    link: "https://zerotomastery.io/career-paths/i-just-want-to-get-hired",
  },
  {
    keyword: "get started",
    msg: "Let's find your career path together!",
    link: "https://zerotomastery.io/tech-career-path-quiz/",
  },
  {
    keyword: "developer",
    msg: "You might want to check out different career paths on Zero to Mastery",
    link: "https://zerotomastery.io/career-paths/",
  },
];

io.on("connection", function (socket) {
  socket.on("user message", (text) => {
    keywordList.forEach(({ keyword, msg, link }) => {
      if (text.includes(keyword)) {
        socket.emit("bot message", { msg, link });
      }
    });
  });
});
