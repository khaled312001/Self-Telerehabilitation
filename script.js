let currentQuestion = 1;
let totalScore = 0;

function showQuestion(questionNumber) {
    const question = document.getElementById(`question${questionNumber}`);
    
    if (question) {
      // Hide all questions first
      const allQuestions = document.querySelectorAll('.question');
      allQuestions.forEach(q => q.style.display = 'none');
  
      // Show the specified question
      question.style.display = 'block';
  
      setTimeout(() => {
        question.style.opacity = 1;
        updateButtons();
      }, 100);
    } else {
      console.error(`Question with number ${questionNumber} not found.`);
    }
  }
  
function hideQuestion(questionNumber) {
  const question = document.getElementById(`question${questionNumber}`);
  question.style.opacity = 0;
  setTimeout(() => {
    question.style.display = 'none';
  }, 1000);
}

function updateButtons() {
    const backButton = document.getElementById('backButton');
    const nextButton = document.getElementById('nextButton');
    const finalQuestion = 15;
  
    if (currentQuestion === 1) {
      backButton.style.display = 'none';
      nextButton.style.display = 'block';
      nextButton.innerHTML = 'Next';
    } else if (currentQuestion === finalQuestion) {
      backButton.style.display = 'block';
      nextButton.style.display = 'block';
      nextButton.innerHTML = 'Submit';
    } else {
      backButton.style.display = 'block';
      nextButton.style.display = 'block';
      nextButton.innerHTML = 'Next';
    }
  }
  

function nextQuestion() {
  hideQuestion(currentQuestion);
  currentQuestion++;
  if (currentQuestion <= 15) {
    showQuestion(currentQuestion);
  } else {
    calculateScore();
  }
}

function prevQuestion() {
  hideQuestion(currentQuestion);
  currentQuestion--;
  if (currentQuestion >= 1) {
    showQuestion(currentQuestion);
  } else {
    calculateScore();
  }
}

function validateAnswer(questionName) {
  const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);

  // If no option is selected, automatically select the first option
  if (!selectedOption) {
    const options = document.querySelectorAll(`input[name="${questionName}"]`);
    if (options.length > 0) {
      options[0].checked = true;
      selectedOption = options[0];
    }
  }

  const score = parseInt(selectedOption.value, 10);
  totalScore += score;
  nextQuestion();

  
}

function calculateScore() {
    // Hide the survey container
    const surveyContainer = document.getElementById('surveyContainer');
    surveyContainer.style.display = 'none';
  // Display the total score
  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `<h2>Your Total Score: ${totalScore}</h2>`;
  const conditionElement = document.getElementById('condition');

  if(totalScore<=5)
  {
    conditionElement.innerHTML = `<h2>Your Condition is Minor </h2>`;
  
  }
  else if(totalScore>=6&&totalScore<=10)
  {
    conditionElement.innerHTML = `<h2>Your Condition is Mild </h2>`;
  
  }
  else if(totalScore>=11&&totalScore<=15)
  {
    conditionElement.innerHTML = `<h2>Your Condition is Moderate </h2>`;
  
  }
  else
  conditionElement.innerHTML = `<h2>Sorry, this system is not suitable for you </h2>`;
  // Show the result container
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.style.display = 'block';

  // Show the "Continue to Next Level" button
  const Belt_TestButton = document.getElementById('Belt_Test');
  Belt_TestButton.style.display = 'block';


}



// Close the modal if the user clicks outside of it
window.onclick = function(event) {
  const modal = document.getElementById('result-modal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
};
function startSurvey() {
  // Hide image container and show survey container
  document.getElementById('imageContainer').style.display = 'none';
  document.getElementById('Belt_Test').style.display = 'none';
  document.getElementById('surveyContainer').style.display = 'block';
  // Show the first question initially
console.log('Showing question 1');
showQuestion(currentQuestion);
}



function showResult() {
  // Display the total score
  const resultElement = document.getElementById('result');
  const conditionElement = document.getElementById('condition');

  resultElement.innerHTML = `<h2>Your Total Score: ${totalScore}</h2>`;
if(totalScore<=5)
{
  conditionElement.innerHTML = `<h2>Your Condition is Minor </h2>`;

}
else if(totalScore>=6&&totalScore<=10)
{
  conditionElement.innerHTML = `<h2>Your Condition is Mild </h2>`;

}
else if(totalScore>=11&&totalScore<=15)
{
  conditionElement.innerHTML = `<h2>Your Condition is Moderate </h2>`;

}
else
conditionElement.innerHTML = `<h2>Sorry, this system is not suitable for you </h2>`;

  // Show the result container
  const resultContainer = document.getElementById('resultContainer');
  resultContainer.style.display = 'block';

  // Show the "Continue to Next Level" button
  const Belt_TestButton = document.getElementById('Belt_Test');
  Belt_TestButton.style.display = 'block';

  // Hide the survey container
  const surveyContainer = document.getElementById('surveyContainer');
  surveyContainer.style.display = 'none';
}

function Belt_Test() {
  window.location.href = 'belt_test.html';

 
}
function Buzzing_Wire_Test() {
  window.location.href = 'buzzing wire_test.html';

 
}
function back() {
  window.location.href = 'index.html';

 
}
function test1() {
  window.location.href = 'test1.html';

 
}
function test2() {
  window.location.href = 'test2.html';

 
}

const guide1 = document.getElementById('guide1');

uide1.innerHTML = `<h3>Sorry, this system is not suitable for you </h3>`;
