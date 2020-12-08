# hw4CodeQuiz, 5 DEC 20 **Extended to 8 DEC 20
#### By Ashley Stith
## Description
This Application runs in the browser is a simple timed, multiple-choice 5 question JavaScript quiz.  It includes a timer originally set for 30 seconds.  For every wrong answer, 5 seconds is subtracted from the timer.  After all 5 questions are answered, or the timer reaches 0 - the quiz results are shown and the user is able to submit their score and initials to their browser's local storage.
Link to application: https://stithac.github.io/hw4CodeQuiz/
## Features
* Application pulls questions from a pre-populated array of question objects.
* Each question object includes: the question, answer, correct answer and rationale.
* Application begins with an instruction screen and Start Quiz button.  The quiz begins when the user clicks "Start Quiz"
* Once the quiz is started, the application begins to countdown 30 seconds and displays the first question. Once an answer button is clicked, the application checks to see if the answer is correct or incorrect.
    * If correct, the application shows a gif of Eddie Murphy throwing the "OK" sign and chimes a bell.
    * If incorrect, the app displays a gif of Omar Epps shaking his head and has an audio "Bruh" sound.
    * The user's choice and rationale behind the correct answer are displayed for each question
* A next button is displayed on each of the question windows.  When clicked, it displays the next question object's question and answer choices.
* When all questions have been answered OR the timer has reached 0, the results screen is displayed.
* The results screen shows the number correct/incorrect and score out of 100. It also includes a userName input for the user to type in their initials.
    * If any other number of chars than 2 are submitted for the userName input, an alert is displayed to only choose 2 chars.
    * UserName/scores are not submitted unless the userName element field contains 2 chars.
* Once the submitBtn is clicked, the scores and userName are saved to the browser localStorage.
* If there are scores saved to the localStorage from previous quiz submissions, they are displayed under the userName input
## Setup/Installation Requirements
* Clone this repository.
* Open app in your browser.
* Click Submit Quiz button and answer the questions. Good luck!
## Known Bugs
There are no known bugs. Site has been passed through the W3C HTML/CSS validation service.
## Technologies Used
* HTML
* CSS
* JavaScript
## Contribution Guidelines
Direct link to repository: https://github.com/stithac/hw4CodeQuiz/
### Specifications
1. User name must be 2 chars in order to submit quiz.
2. All quiz questions must be answered within 30 seconds.
