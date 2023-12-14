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
  if (currentQuestion > 0) {
    showQuestion(currentQuestion);
  }
}

function validateAnswer(questionName) {
  const selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
  if (selectedOption) {
    const score = parseInt(selectedOption.value, 10);
    totalScore += score;
    nextQuestion();
  } else {
    alert('Please select an option before proceeding.');
  }
}

function calculateScore() {
  // Show the result modal
  const resultModal = document.getElementById('result-modal');
  resultModal.style.display = 'block';

  // Display the total score
  const resultElement = document.getElementById('result');
  resultElement.innerHTML = `<p>Your Total Score: ${totalScore}</p>`;
}

function closeModal() {
  document.getElementById('result-modal').style.display = 'none';
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
    document.getElementById('surveyContainer').style.display = 'block';
  }

// Show the first question initially
console.log('Showing question 1');
showQuestion(currentQuestion);
