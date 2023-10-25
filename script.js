let questions = [
    {
        "question": "Was ist die chemische Formel für Wasser?",
        "answer_1": "H2O2",
        "answer_2": "CO2",
        "answer_3": "NaCl",
        "answer_4": "H2O",
        "right_answer": 4
    },

    {
        "question": "Welcher Fluss ist der längste der Welt?",
        "answer_1": "Nil",
        "answer_2": "Mississippi",
        "answer_3": "Amazonas",
        "answer_4": "Donau",
        "right_answer": 1

    },

    {
        "question": "Wie viele Planeten gibt es in unserem Sonnensystem?",
        "answer_1": "7",
        "answer_2": "8",
        "answer_3": "9",
        "answer_4": "10",
        "right_answer": 2
    },

    {
        "question": "Wer ist der Autor des Buches - Die Verwandlung- ?",
        "answer_1": "Charles Dickens",
        "answer_2": "Fjodor Dostojewski",
        "answer_3": "Leo Tolstoi",
        "answer_4": "Franz Kafka",
        "right_answer": 4
    },

    {
        "question": "Welches Land liegt südlich von Ägypten?",
        "answer_1": "Griechenland",
        "answer_2": "Saudi-Arabien",
        "answer_3": "Libanon",
        "answer_4": "Tunesien",
        "right_answer": 2
    },

    {
        "question": "Welche/r Sportler*in hält den Rekord für die meisten gewonnenen Grand-Slam-Turniere im Tennis?",
        "answer_1": "Roger Federer",
        "answer_2": "Rafael Nadal",
        "answer_3": "Serena Williams",
        "answer_4": "Novak Djokovic",
        "right_answer": 4
    },

    {
        "question": "Wie lautet die Formel für den Umfang eines Kreises?",
        "answer_1": "π * r",
        "answer_2": "π * r^2",
        "answer_3": "2 * π * r",
        "answer_4": "2 * π * r^2",
        "right_answer": 3
    },
];


let currentQuestion = 0;
let rightQuestions = 0;

let AUDIO_SUCCESS = new Audio('audio/success.wav');
let AUDIO_FAIL = new Audio('audio/wrong.mp3');


function init() {
    document.getElementById('all-questions').innerHTML = questions.length;
    showQuestion();
}

function openQuiz() {
    document.getElementById('standard-container').style = 'display: none';
    document.getElementById('red-btn').style = 'display: none';
    document.getElementById('quiz-card').style = '';
    document.getElementById('only-question-container').style ='';

    showQuestion(); /*um die erste Frage anzuzeien*/



}


function showQuestion() {
    if (gameIsOver()) {
        showEndScreen();

    } else {//sonst//
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
    return currentQuestion >= questions.length;
}


function answer(selection) { /*per onclick im index.html festgelegt (..)= selection*/
    let question = questions[currentQuestion]; /* global festgelegt, Anfangswert ist 1*/
    let selectedQuestionNumber = selection.slice(-1);/* letzter Buchstabe wird gefiltert */

    let idOfRightAnswer = `answer_${question['right_answer']}`;

    if (rightAnswerSelected(selectedQuestionNumber)) {
        console.log('Richtige Antwort');
        document.getElementById(selection).parentNode.classList.add('bg-success');
        AUDIO_SUCCESS.play(); //success-Ton wird gespielt//
        rightQuestions++; /* richtige Antworten um 1 erhöht*/

    } else {
        console.log('Falsche Antwort');
        document.getElementById(selection).parentNode.classList.add('bg-danger');
        document.getElementById(idOfRightAnswer).parentNode.classList.add('bg-success');
        AUDIO_FAIL.play(); //wrong-answer Ton wird gespielt//
    }
    document.getElementById('next-button').disabled = false;
}


function rightAnswerSelected(selectedQuestionNumber) {
    return selectedQuestionNumber == questions[currentQuestion]['right_answer'];
}



function showEndScreen() {
    document.getElementById('endScreen').style = '';
    document.getElementById('questionBody').style = 'display: none';
    document.getElementById('header-image').src = './img/trophy.png';/* id existiert nicht mehr!!*/
    document.getElementById('amount-of-right-questions').innerHTML = rightQuestions; /* richtige Antworten*/
    document.getElementById('amount-of-questions').innerHTML = questions.length; /* xxx von (7, also questions.length)*/
}

function updateProgressBar() {
    /*Progress-Bar Rechnung + Darstellung*/
    let percent = (currentQuestion + 1) / questions.length; //Prozentrechnung//
    percent = Math.round(percent * 100);
    document.getElementById('progress-bar').innerHTML = `${percent}%`; // Anzeigen des jeweiligen Prozentsatzes//
    document.getElementById('progress-bar').style = `width:${percent}%`; //Breite der ProgressBar in % //
}

function updateToNextQuestion() {
    let question = questions[currentQuestion];/*question= 0*/
    document.getElementById('question-number').innerHTML = currentQuestion + 1; /*Fragen-Counter*/
    document.getElementById('questiontext').innerHTML = question['question'];/*Frage wird beim Laden der Seite angezeigt*/
    document.getElementById('answer_1').innerHTML = question['answer_1'];
    document.getElementById('answer_2').innerHTML = question['answer_2'];
    document.getElementById('answer_3').innerHTML = question['answer_3'];
    document.getElementById('answer_4').innerHTML = question['answer_4'];
}



function nextQuestion() {
    currentQuestion++;
    document.getElementById('next-button').disabled = true;
    resetAnswerButtons();
    showQuestion();

}

function resetAnswerButtons() {
    document.getElementById('answer_1').parentNode.classList.remove('bg-success');
    document.getElementById('answer_1').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_2').parentNode.classList.remove('bg-success');
    document.getElementById('answer_2').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_3').parentNode.classList.remove('bg-success');
    document.getElementById('answer_3').parentNode.classList.remove('bg-danger');
    document.getElementById('answer_4').parentNode.classList.remove('bg-success');
    document.getElementById('answer_4').parentNode.classList.remove('bg-danger');
}

function restartGame() {

    document.getElementById('header-image').src = './img/question-pic.png';
    document.getElementById('questionBody').style = ''; //Start-Screen einblenden //
    document.getElementById('endScreen').style = 'display: none'; //Endscreen ausblenden//
    rightQuestions = 0;
    currentQuestion = 0;
    init();
}
