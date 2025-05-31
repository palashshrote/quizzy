import express from "express";
import bodyParser from "body-parser";
import env from "dotenv";
env.config();

const app = express();
const port = process.env.PORT_NO;

let quiz = [
  { id: "1", region: "Maharashtra", capital: "Mumbai" },
  { id: "2", region: "Madhya Pradesh", capital: "Bhopal" },
  { id: "3", region: "Karnataka", capital: "Bengaluru" },
  { id: "4", region: "Telangana", capital: "Hyderabad" },
  { id: "5", region: "Gujrat", capital: "Ahmedabad" },
  { id: "6", region: "Rajasthan", capital: "Jaipur" },
  { id: "7", region: "Lakshadweep", capital: "Kavaratti" },
  { id: "8", region: "Goa", capital: "Panaji" },
  { id: "9", region: "Andhra Pradesh", capital: "Amaravati" },
  { id: "10", region: "Odisha", capital: "Bhubaneswar" },
  { id: "11", region: "West Bengal", capital: "Kolkata" },
  { id: "12", region: "Kerala", capital: "Thiruvananthapuram" },
  { id: "13", region: "Tamil Nadu", capital: "Chennai" },
  { id: "14", region: "Chhattisgarh", capital: "Raipur" },
  { id: "15", region: "Jharkhand", capital: "Ranchi" },
  { id: "16", region: "Bihar", capital: "Patna" },
  { id: "17", region: "Uttar Pradesh", capital: "Lucknow" },
  { id: "18", region: "Haryana", capital: "Chandigarh" },
  { id: "19", region: "Punjab", capital: "Chandigarh" },
  { id: "22", region: "Himachal Pradesh", capital: "Shimla" },
  { id: "23", region: "Uttarakhand", capital: "Dehradun" },
  { id: "24", region: "Sikkim", capital: "Gangtok" },
  { id: "25", region: "Assam", capital: "Dispur" },
  { id: "26", region: "Arunachal Pradesh", capital: "Itanagar" },
  { id: "27", region: "Meghalaya", capital: "Shillong" },
  { id: "28", region: "Nagaland", capital: "Kohima" },
  { id: "29", region: "Manipur", capital: "Imphal" },
  { id: "30", region: "Mizoram", capital: "Aizawl" },
  { id: "31", region: "Tripura", capital: "Agartala" },
  { id: "20", region: "Jammu and Kashmir", capital: "Srinagar" },
  { id: "21", region: "Ladakh", capital: "Leh" },
  { id: "32", region: "Andaman and Nicobar", capital: "Port Blair" },
];
let quizSample = [
  { id: 1, region: "Sikkim", capital: "Gangtok" },
  { id: 2, region: "Maharashtra", capital: "Mumbai" },
  { id: 3, region: "Goa", capital: "Panaji" },
];

let userScore = 0;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

let currentQuestion = {};
var previousQuestionsId = [];
var randomIndex;

// GET home page
app.get("/", async (req, res) => {
  userScore = 0;
  refresh();
  await nextQuestion();
  console.log(currentQuestion);
  res.render("index.ejs", { question: currentQuestion });
});

// POST a new post
app.post("/submit", (req, res) => {
  let answer = req.body.answer.trim();
  console.log(answer);
  let isCorrect = false;
  if (currentQuestion.capital.toLowerCase() === answer.toLowerCase()) {
    userScore++;
    console.log(userScore);
    isCorrect = true;
    previousQuestionsId.push(randomIndex);
  }
  if (previousQuestionsId.length === quiz.length) {
    console.log("Quiz completed");
    endQuiz(res);
  } else {
    nextQuestion();
    res.render("index.ejs", {
      question: currentQuestion,
      wasCorrect: isCorrect,
      totalScore: userScore,
    });
  }
});
async function endQuiz(res) {
  res.render("index.ejs", {
    question: currentQuestion,
    totalScore: userScore,
    completed: "true",
  });
}
function refresh() {
  previousQuestionsId = [];
}
async function nextQuestion() {
  randomIndex = Math.floor(Math.random() * quiz.length);
  while (previousQuestionsId.includes(randomIndex)) {
    randomIndex = Math.floor(Math.random() * quiz.length);
  }
  const randomState = quiz[randomIndex];
  currentQuestion = randomState;
}

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});
