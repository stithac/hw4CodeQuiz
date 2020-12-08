var timeEl = document.querySelector(".time");
timeEl.textContent = "Time: 0";

var mainEl = document.getElementById("main");
var startBtn = document.getElementById("start");
var footerEl = document.querySelector(".card-footer");

var headerEl = document.querySelector(".card-header");

var correctEl = document.createElement("p");
    correctEl.textContent = "# Correct: "
    correctEl.setAttribute("class", "score right");

var incorrectEl = document.createElement("p");
    incorrectEl.textContent = "# Incorrect: ";
    incorrectEl.setAttribute("class", "score right");

var gifImg = document.createElement("img");
    gifImg.setAttribute("class", "gif");

var questionArea = document.createElement("div");
var answerArea = document.createElement("div");

var rationaleArea = document.createElement("div");
var rationaleEl = document.createElement("p");

var scoreArea = document.createElement("div");

var nextBtn = document.createElement("button");
nextBtn.setAttribute("class", "right  btn");
nextBtn.textContent = "Next";

var submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "btn");

    submitBtn.textContent = "Submit score";

var instructionsEl = document.createElement("p");
instructionsEl.setAttribute("class", "center");
instructionsEl.innerHTML = "The <b>JavaScript Fundamentals Quiz</b> is a timed, multiple-choice coding quiz to test your knowledge of the JavaScript fundamentals.  You will have 60 seconds to complete the 5 questions, but BE CAREFUL! Any wrong answer will cost you 5 seconds! <br/><br/>  Click the <i>Start Quiz</i> button below to begin. Good Luck!!";

mainEl.appendChild(instructionsEl);

var questionEl = document.createElement("p");
questionEl.setAttribute("class", "question");

var userNameEl = document.createElement("input");
    userNameEl.setAttribute("type", "text");

var secondsLeft = 61;
var numCorrect = 0;
var numIncorrect = 0;

var questionsList = [{
    question: "1- What is the HTML tag that inline JavaScript code should be written under?",
    choices: ["A) <javascript>", "B) <script>", "C) <js> ", "D) <html>"],
    correctAnswer: "B) <script>",
    rationale: "Inline JavaScript code should be written using the <script> tag."
},{
    question: "2- How is a function called in JavaScript?",
    choices: ["A) call myFunction()", "B) function myFunction()", "C) myFunction function() ", "D) myFunction()"],
    correctAnswer: "D) myFunction()",
    rationale: "In JavaScript, functions are called directly using the syntax: functionName()"
},{
    question: "3- How do you write an 'if' statement in JavaScript?",
    choices: ["A) if( i === 0 ){ //do this }", "B) if( i = 0; i < 3; i++ )( //do this )", "C) if{ i < 5 }{ //do this } ", "D) if i == 0( //do this )"],
    correctAnswer: "A) if( i === 0 ){ //do this }",
    rationale: "The syntax for an if statement in JavaScript is if(condition){}"
},{
    question: "4- What is the correct syntax for adding a single line comment in JavaScript?",
    choices: ["A) //This is the comment", "B) **This is the comment**", "C) --This is the comment ", "D) <This is the comment>"],
    correctAnswer: "A) //This is the comment",
    rationale: "Single line comments start with //"
},{
    question: "5- How would you print 5 to the console?",
    choices: ["A) print(5)", "B) print.console(5)", "C) console.print(5) ", "D) console.log(5)"],
    correctAnswer: "D) console.log(5)",
    rationale: "The action, which is built into the console object is the .log() method.  Whenever you write console.log() in JavaScript code, what is in the parenthesis will be printed to the console."
}];

var scores = [];
var scoreEl = document.createElement("p");

console.log("*** Welcome to my JavaScript Coding Quiz Application! ***");

function startQuiz(){
    console.log("--- Starting the startQuiz() function ---");

    i = 0;

    setTimer();

    instructionsEl.remove();
    startBtn.remove();
    // footerEl.setAttribute("style", "text-align:right");

    headerEl.appendChild(correctEl);
    headerEl.appendChild(incorrectEl);

    mainEl.appendChild(questionArea);
    mainEl.appendChild(answerArea);

    questionArea.appendChild(questionEl);

    footerEl.appendChild(nextBtn);

    for(j = 0; j< 4; j++){
        var answerEl = document.createElement("button");
        answerEl.setAttribute("class", "choice btn");

        answerArea.appendChild(answerEl);

    };// for loop adds 4 blank buttons with classes choice and btn to the questionArea div


        buildQuiz(i, questionEl);

        answerArea.addEventListener("click", function(event){
            event.preventDefault();
            if(event.target.matches(".choice")){
                checkAnswer(i, event.target);
            }
        });

        nextBtn.addEventListener("click", function(event){
            event.preventDefault();
            console.log("Next button clicked!");
            rationaleArea.remove();
            gifImg.remove();

            if (i < questionsList.length - 1){
                mainEl.appendChild(answerArea);
                i++;
                buildQuiz(i, questionEl);
            }else{
                secondsLeft = 1;
                return;
            }
        });

}// End of startQuiz() function

function buildQuiz(index, questionElement){
    questionElement.textContent = questionsList[index].question;
    var buttons = document.querySelectorAll(".choice");
    for(j = 0; j < buttons.length; j++ ){
        buttons[j].textContent = questionsList[index].choices[j];
    }
}

function checkAnswer(index, button) {

    console.log("--- Starting checkAnswer() function ---");

    gifImg.remove();

    rationaleArea.innerHTML = "";
    rationaleEl.innerHTML = "";

    if(questionsList[index].correctAnswer === button.textContent){
        console.log("CORRECT");
        numCorrect++;
        console.log("Number correct: " + numCorrect);
        rationaleArea.setAttribute("class", "correct");
        rationaleEl = "Correct! " + questionsList[index].rationale;

        gifImg.setAttribute("src", "https://media.giphy.com/media/3oEjI5VtIhHvK37WYo/giphy.gif")

    }else if(questionsList[index].correctAnswer != button.textContent){

        console.log("Incorrect!");
        numIncorrect++;
        console.log("Number incorrect: " + numIncorrect);
        rationaleArea.setAttribute("class", "incorrect");
        rationaleEl.textContent = "Incorrect! The correct answer is : " + questionsList[index].correctAnswer + ". " + questionsList[index].rationale;

        gifImg.setAttribute("src", "https://media.giphy.com/media/3o7TKVfu4rwyscasla/giphy.gif")
        if(secondsLeft > 6){
            secondsLeft -= 5;
        }else{
            secondsLeft = 1;
        }
    }

    answerArea.remove();

    rationaleArea.append(button.textContent);
    rationaleArea.innerHTML += "<br>";
    mainEl.appendChild(rationaleArea);
    rationaleArea.append(rationaleEl);

    mainEl.appendChild(gifImg);

    correctEl.textContent = "# Correct: " + numCorrect;
    incorrectEl.textContent ="# Incorrect: " +  numIncorrect;
}

function showResults(){
    console.log("--- Starting showResults() function ---");
    mainEl.innerHTML = "";
    correctEl.remove();
    incorrectEl.remove();
    nextBtn.remove();
    timeEl.textContent = 0;

    scoreEl = (numCorrect * 20);

    mainEl.innerHTML = "<b>Results:</b>";
    mainEl.innerHTML += "<br>";
    mainEl.append("Total number correct: " + numCorrect);
    mainEl.innerHTML += "<br>";
    mainEl.append("Total number incorrect: " + numIncorrect);
    mainEl.innerHTML += "<br>";
    mainEl.append("Score: " + scoreEl);

    mainEl.innerHTML += "<br><br> Enter your initials (2 chars):  ";

    mainEl.append(userNameEl);

    mainEl.appendChild(scoreArea);
    scoreArea.innerHTML = "<br><b>Recent Scores:</b>";

    footerEl.append(submitBtn);


    var scoresList = document.createElement("ul");

    var storedScores = JSON.parse(localStorage.getItem("scores"));
    if (storedScores !== null){
        scores = storedScores;
    }

    //render scores to the DOM
    for(i = 0; i < scores.length; i++){
        var score = scores[i].score;
        var name = scores[i].name;

        var li = document.createElement("li");
        li.textContent = score + ", " + name;
        li.setAttribute("data-index", i);

        scoreArea.appendChild(scoresList);
        scoresList.appendChild(li);
    }
}

function submitQuiz(){
    console.log(userNameEl.value.length);
        console.log(userNameEl.value);

        if(userNameEl.value.length >= 2){
            var userData = {
                name: userNameEl.value,
                score: scoreEl
            }

            scores.push(userData);

            localStorage.setItem("scores", JSON.stringify(scores));

            document.location.href = ""; //Restarts program from the beginning
        }else{
            alert("Enter 2 chars! Example: AS for Ashley Stith");
        }
}

function setTimer() {
    var timerInterval = setInterval(function() {
      secondsLeft--; //take one away from secondsLeft variable each time
      timeEl.textContent = "Time: " + secondsLeft;

      if(secondsLeft === 0) {
        clearInterval(timerInterval);
        showResults();
      }
    }, 1000);//end of setInterval function and number of milliseconds to wait between running function
  }

startBtn.addEventListener("click", startQuiz);
submitBtn.addEventListener("click", submitQuiz);