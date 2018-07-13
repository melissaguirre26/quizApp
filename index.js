'use strict';

let currentIndex = 0; //sets current index to 0
let score = 0; //sets beg score to 0

//this functions increments score by 1
function incrementScore() {
    score++;
}
//this function removes <div class="ole"> <h2>What do you know about Flamenco?</h2>
function removeStartScreen() {
    $('.ole').remove();
}

//where are these classes? js-question-form?
//this will return a form with an h2 with the index + 1 and it will pull the question text and display it on the h2 ex. first question, index = 0 so 0+1 =1 if you go to QUESTIONS "what does flamenco not include" is the first question - so this function is passing the index of QUESTIONS and the text property = question - same with the answers
//question in this function alludes to anything that gets passed, index alludes to the index of anything that gets passed, question.text, go look in QUESTIONS and get the text

//constructor function - waits until you need it doesn't just run - you have a lot of code in a single function


function generateQuestionElement(index, question) {
  //generateQuestionElement(index, QUESTIONS[index]) - defined on line 83 - follow the spaghetti 
    return `
      <form id="js-question-form">
      <fieldset>
      <legend>Question ${index + 1} of ${QUESTIONS.length}</legend>
        <section class="question">
            <h2>${(index + 1) + '. ' + question.text}</h2>
            <div class="option">
                <input type="radio" name="answer" id="r1" required/>
                <label for="r1">${question.answers[0]}</label>
            </section>
            <div class="option">
                <input type="radio" name="answer" id="r2"/>
                <label for="r2">${question.answers[1]}</label>
            </div>
            <div class="option">
                <input type="radio" name="answer" id="r3"/>
                <label for="r3">${question.answers[2]}</label>
            </div>
            <div class="option">
                <input type="radio" name="answer" id="r4"/>
                <label for="r4">${question.answers[3]}</label>
            </div>
        </div>
        <section class="lower">
            <div class="score">
                <span>score: ${score}/${QUESTIONS.length}</span>
             </div>
            <div class="score">
                <span>Incorrect: ${(index) - score}</span>
            </div>
        </section>
      </fieldset>
      <button type="submit">Submit</button>
    </form>`;
}

function generateCorrectFeedbackElement() {
    return `
    <div class="feedback">
        <h2 class="correct">Correct!</h2>
    </div>
    <button id="js-next">Next</button>`;
}

function generateIncorrectFeedbackElement(correctAnswer) {
  //deined on line 110 correctAnswer = ANSWERS[currentIndex];
    return ` 
    <div class="feedback">
        <h2 class="incorrect">Incorrect!</h2>
        <p>The correct answer was: </p>
        <span class="answer">${correctAnswer}</span>    
    </div>
    <button id="js-next">Next</button>`;
}

function generateResultsElement(score) {
    return `
    <div class="feedback">
        <h2>Quiz completed!</h2>
        <p>You got ${score} out of ${QUESTIONS.length} questions correct.</p>
    </div>
    <button id="js-restart">Restart</button>`;
}

function renderQuestion(index) {
    let result = generateQuestionElement(index, QUESTIONS[index]);
    $('main').html(result); //pushes it out to dom
}

function renderFeedback(feedbackElement) {
    $('main').html(feedbackElement); 
    //defined on line 115 - feedback = generateCorrectFeedbackElement();;
}

function renderResults() {
    $('.score').remove();
    $('main').html(generateResultsElement(score));
}


function handleStartClicked() {
    $('#js-start').click(() => {
        removeStartScreen(); //defined line 11-12
        renderQuestion(currentIndex);
    });
}

function handleSubmitClicked() {
    $(document).on('submit', '#js-question-form', event => {
        event.preventDefault(); //this prevents the default behavior on buttons ex, sending to server

        const answer = $('input:checked').siblings('label').text();
        const correctAnswer = ANSWERS[currentIndex];
        const isCorrect = answer === correctAnswer;
        let feedback;
        
        if (isCorrect) {
            incrementScore();//function defined on line 7-8
            feedback = generateCorrectFeedbackElement();
        } else {
            feedback = generateIncorrectFeedbackElement(correctAnswer);
        }

        renderFeedback(feedback);
    });
}

function handleNextClicked() {
    $('main').on('click', '#js-next', () => {
        if (currentIndex + 1 < QUESTIONS.length) {
            currentIndex++;
            renderQuestion(currentIndex);
        } else {
            renderResults();
        }
    });
}

function handleRestartClicked() {
    $('main').on('click', '#js-restart', () => {
        location.reload();
    });
}

function handleQuiz() {
  //
    handleStartClicked();
    handleSubmitClicked();
    handleNextClicked();
    handleRestartClicked();
}

$(handleQuiz);//when you're done loading DOM call handleQuiz