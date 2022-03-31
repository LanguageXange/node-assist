const socket = io();
const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new SpeechRecognition();
const startButton = document.querySelector("button");
const microphone = document.querySelector(".fa-microphone");
const output = document.querySelector(".output");
const loading = document.querySelector(".lds-ripple");

recognition.lang = "en-US";
recognition.interimResults = false;
recognition.continuous = true;
let listening = false;
const start = () => {
  botSpeak("Hello! How can I help you?");
  recognition.start();
  output.textContent = "Listening ... ";
  loading.classList.add("reveal");
  microphone.classList.add("hide");
};

const stop = () => {
  recognition.stop();
  botSpeak("Goodbye! I hope you enjoyed my service");
  output.textContent = "Session ends ";
  loading.classList.remove("reveal");
  microphone.classList.remove("hide");
};

startButton.addEventListener("click", () => {
  listening ? stop() : start();
  listening = !listening;
});

recognition.addEventListener("result", (e) => {
  //console.log(e.results); // e.results :SpeechRecognitionResult object
  const last = e.results.length - 1;
  const text = e.results[last][0].transcript;
  socket.emit("user message", text);
});

recognition.addEventListener("speechend", () => {
  listening ? stop() : null;
  listening = !listening;
});

recognition.addEventListener("error", (e) => {
  console.log(e.error);
  stop();
});

// receive message from server
const botSpeak = (text) => {
  const synth = window.speechSynthesis;
  const utterance = new SpeechSynthesisUtterance(text);
  synth.speak(utterance);
  // Note: it's possible to have infinite loop if the bot message includes keywords
};

socket.on("bot message", (answer) => {
  const { msg, link } = answer;
  botSpeak(msg);
  if (link) {
    window.open(link, "_blank");
  }
});
