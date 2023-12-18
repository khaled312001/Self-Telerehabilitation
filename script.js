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
    let selectedOption = document.querySelector(`input[name="${questionName}"]:checked`);
  
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
  
    // Store totalScore in localStorage
    localStorage.setItem('totalScore', totalScore);
  
    // Redirect to the result page
    window.location.href = 'result.html';
  }
  
  
  function startSurvey() {
    // Hide image container and show survey container
    document.getElementById("imageContainer").style.display = "none";
    document.getElementById("surveyContainer").style.display = "block";
    showQuestion(currentQuestion);
  }
  
  function result() {
    // Retrieve the totalScore from localStorage
    const totalScore = parseInt(localStorage.getItem('totalScore'), 10);
  
    // Display the total score
    const resultElement = document.getElementById('result');
    const conditionElement = document.getElementById('condition');
  
    resultElement.innerHTML = `<h2>Your Total Score: ${totalScore}</h2>`;
  
    // Display the condition based on the total score
    if (totalScore <= 5) {
      conditionElement.innerHTML = `<h2>Your Condition is Minor</h2>`;
      // Perform exercises for Minor stage
      performExercises(12);
    } else if (totalScore >= 6 && totalScore <= 10) {
      conditionElement.innerHTML = `<h2>Your Condition is Mild</h2>`;
      // Perform exercises for Mild stage
      performExercises(10);
    } else if (totalScore >= 11 && totalScore <= 15) {
      conditionElement.innerHTML = `<h2>Your Condition is Moderate</h2>`;
      // Perform exercises for Moderate stage
      performExercises(8);
    } else {
      conditionElement.innerHTML = `<h2>Sorry, this system is not suitable for you</h2>`;
      const Tilting_Test = document.getElementById('Tilting_Test');
      Tilting_Test.style.display = 'none';
      const Buzzing_Wire_Test = document.getElementById('Buzzing_Wire_Test');
      Buzzing_Wire_Test.style.display = 'none';
    }
  
    // Show the result container
    const resultContainer = document.getElementById('resultContainer');
    resultContainer.style.display = 'block';
  }
  
  function performExercises(count) {
    const exercisesElement = document.getElementById('exercises');
    exercisesElement.innerHTML = `<h2>Perform the following exercises:</h2>
                                  <ul >
                                    <li>${count} of Anterior target angle: 25:30 degrees</li>
                                    <li>${count} of Posterior target angle: 15:20</li>
                                    <li>${count} of Left target angle: 20:25</li>
                                    <li>${count} of Right target angle: 20:25</li>
                                  </ul>`;
  }
  
  
  
  function Tilting_Test() {
    window.location.href = 'Tilting_test.html';
  }
  
  function Buzzing_Wire_Test() {
    window.location.href = 'buzzing wire_test.html';
  }
  
  function back() {
    window.location.href = 'result.html';
  }
  function backs() {
    window.location.href = 'index.html';
  }
  
  function test1() {
    window.location.href = 'test1.html';
  }
  
  function test2() {
    window.location.href = 'test2.html';
  }