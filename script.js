//Elements and divs
var timeEl = document.querySelector(".time");
    timeEl.textContent = "Time: 0";
var headerEl = document.querySelector(".card-header");
var mainEl = document.getElementById("main");
var footerEl = document.querySelector(".card-footer");

//--instructionsEl displays the initial instructions
var instructionsEl = document.createElement("p");
    instructionsEl.setAttribute("class", "center");
    instructionsEl.innerHTML = "The <b>JavaScript Fundamentals Quiz</b> is a timed, multiple-choice coding quiz to test your knowledge of the JavaScript fundamentals.  You will have 30 seconds to complete the 5 questions, but BE CAREFUL! Any wrong answer will cost you 5 seconds! <br/><br/>  Click the <i>Start Quiz</i> button below to begin. Good Luck!!";

//--Elements used to display questions and score results
var questionEl = document.createElement("p");
    questionEl.setAttribute("class", "question");
var correctEl = document.createElement("p");
    correctEl.textContent = "# Correct: "
    correctEl.setAttribute("class", "score right");
var incorrectEl = document.createElement("p");
    incorrectEl.textContent = "# Incorrect: ";
    incorrectEl.setAttribute("class", "score right");
var scoreEl = document.createElement("p");
var rationaleEl = document.createElement("p");
var userNameEl = document.createElement("input"); //Used to collect user's initials after submitting quiz
    userNameEl.setAttribute("type", "text");

//--Placeholder divs for questions, answers, scores and results
var questionArea = document.createElement("div");
var answerArea = document.createElement("div");
var scoreArea = document.createElement("div");
    scoreArea.setAttribute("class","scoreArea");
var rationaleArea = document.createElement("div");

//Elements for animation
var gifImg = document.createElement("img");
    gifImg.setAttribute("class", "gif");
var audioElement = document.createElement("audio");


//Buttons
var startBtn = document.getElementById("start");
var nextBtn = document.createElement("button");
    nextBtn.setAttribute("class", "right  btn");
    nextBtn.textContent = "Next";
var submitBtn = document.createElement("button");
    submitBtn.setAttribute("class", "btn");
    submitBtn.textContent = "Submit score";

//Initializing global variables
var secondsLeft = 31;
var numCorrect = 0;
var numIncorrect = 0;
var scores = [];

//Create array of question objects to be used in game
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

console.log("*** Welcome to my JavaScript Coding Quiz Application! ***"); //Page has loaded and js file read

mainEl.appendChild(instructionsEl); //Adding instructions to mainEl when app first opens

//startQuiz is called when the startBtn is clicked. It removes the instruction text and appends the question/answer areas
function startQuiz(){
    console.log("--- Starting the startQuiz() function ---");

    var i = 0;

    setTimer(); //Call setTimer() function to begin countdown

    //Remove the following elements/button that were originally displayed
    instructionsEl.remove();
    startBtn.remove();

    //Add elements to begin the quiz:number correct/incorrect and questionArea and nextBtn
    headerEl.appendChild(correctEl);
    headerEl.appendChild(incorrectEl);
    mainEl.appendChild(questionArea);
    mainEl.appendChild(answerArea);
    questionArea.appendChild(questionEl);
    footerEl.appendChild(nextBtn);

    //For loop adds 4 blank buttons with the classes choice and btn to the answerArea (which is uder questionArea in the mainEL div)
    for(j = 0; j< 4; j++){
        var answerEl = document.createElement("button");
        answerEl.setAttribute("class", "choice btn");
        answerArea.appendChild(answerEl);
    };

    buildQuiz(i, questionEl); //Calls buildQuiz function and passes in index and the question

    //Add event listener to the answerArea. If a button with the class of "choice" is clicked, call checkAnswer() function and pass the index and button that was clicked
    answerArea.addEventListener("click", function(event){
        event.preventDefault();
        if(event.target.matches(".choice")){
            checkAnswer(i, event.target);
        }
    });

    //Add event listener to the nextbutton.  When clicked, remove rationalArea, gifImg and audioElement
    nextBtn.addEventListener("click", function(event){
        event.preventDefault();
        // console.log("Next button clicked!");
        rationaleArea.remove();
        gifImg.remove();
        audioElement.remove();

        //If i < questionsList.length (4) then add the answerArea and call the buildQuiz function and pass the index and question
        if (i < questionsList.length - 1){
            mainEl.appendChild(answerArea);
            i++;
            buildQuiz(i, questionEl);
        }else{
            secondsLeft = 1;
            return;
        }// If i is > 4, set secondsLeft to 1 and return from function
    });
}// End of startQuiz() function

//buildQuiz function sets the questionEl to appropriate question text and the choice buttons to the appropriate answers
function buildQuiz(index, questionElement){
    questionElement.textContent = questionsList[index].question;
    var buttons = document.querySelectorAll(".choice");
    for(j = 0; j < buttons.length; j++ ){
        buttons[j].textContent = questionsList[index].choices[j];
    }
}// End of buildQuiz() function

//checkAnswer function takes in the index and clicked choice button to determine if the button clicked is the same as the correctAnswer in the questionsList object.
function checkAnswer(index, button) {
    console.log("--- Starting checkAnswer() function ---");

    gifImg.remove(); //Removes the gifImg if present

    //Clear out rationale text
    rationaleArea.innerHTML = "";
    rationaleEl.innerHTML = "";

    //Set the gifImg and audioElements appropriately based on the button clicked. Also, set the rationale to be the questionList object's rationale. Otherwise, se
    if(questionsList[index].correctAnswer === button.textContent){
        console.log("CORRECT");
        gifImg.setAttribute("src", "https://media.giphy.com/media/3oEjI5VtIhHvK37WYo/giphy.gif");
        audioElement.setAttribute("src", "./Assets/soundsilk-Correct-Answer-Soundeffect.mp3");

        numCorrect++; //Add one to numCorrect
        console.log("Number correct: " + numCorrect);
        rationaleArea.setAttribute("class", "correct");
        rationaleEl.textContent = "Correct! " + questionsList[index].rationale;

    }else if(questionsList[index].correctAnswer != button.textContent){

        console.log("Incorrect!");
        numIncorrect++;
        console.log("Number incorrect: " + numIncorrect);
        rationaleArea.setAttribute("class", "incorrect");
        rationaleEl.textContent = "Incorrect! The correct answer is : " + questionsList[index].correctAnswer + ". " + questionsList[index].rationale;

        gifImg.setAttribute("src", "https://media.giphy.com/media/3o7TKVfu4rwyscasla/giphy.gif")
        audioElement.setAttribute("src", "./Assets/movie_1.mp3");

        //If there are less than 6 seconds, set secondsLeft to 1. Otherwise, subtract 5 from secondsLeft for each wrong answer
        if(secondsLeft > 6){
            secondsLeft -= 4;
        }else{
            secondsLeft = 1;
        }
    }

    answerArea.remove(); //remove answer buttons

    //Add rationaleArea, gifImg, audioElement to page.  Values set in if/else statement above
    rationaleArea.append(button.textContent);
    rationaleArea.innerHTML += "<br>";
    mainEl.appendChild(rationaleArea);
    rationaleArea.append(rationaleEl);
    audioElement.play();
    mainEl.appendChild(gifImg);

    //Update the correct/incorrect elements that are displayed on the header
    correctEl.textContent = "# Correct: " + numCorrect;
    incorrectEl.textContent ="# Incorrect: " +  numIncorrect;
}//End of checkAnswer()

//showResults function displays the Quiz results and most recent scores on the page
function showResults(){
    console.log("--- Starting showResults() function ---");

    //Remove quiz/score elements and the nextBtn
    mainEl.innerHTML = "";
    correctEl.remove();
    incorrectEl.remove();
    nextBtn.remove();
    timeEl.textContent = "Time: 0"//Set timer to 0

    scoreEl = (numCorrect * 20); //Calculate the score based on numCorrect

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
    scoreArea.innerHTML = "<br><b>Recently Submitted Scores:</b>";

    footerEl.append(submitBtn); //Add submitBtn to footer

    //create a scoresList ul to house the scores
    var scoresList = document.createElement("ul");

    //check to see if there are any storedScores in localStorage. If so, set them to the empty scores array
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
}//End of showResults()

//submitQuiz() function submits the user's name and score to the LocalStorage
function submitQuiz(){
    console.log("Starting submitQuiz() function");

    //If the userName input is 2 chars, create a userData object and set the values based on input. Otherwise user is alerted to put in 2 chars
    if(userNameEl.value.length >= 2){
        var userData = {
            name: userNameEl.value,
            score: scoreEl
        }

        //Add created object to stores array
        scores.push(userData);

        //Save in localStorage
        localStorage.setItem("scores", JSON.stringify(scores));

        document.location.href = ""; //Refreshes page and restarts program from the beginning
    }else{
        alert("Enter 2 chars! Example: AS for Ashley Stith");
    }
}// End of submitQuiz function

//setTimer() function creates the countdown and calls the showResults() fucnction once the timer has reached 0
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