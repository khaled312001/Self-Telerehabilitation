let currentQuestion = 1;
let totalScore = 0;
let currentAngle = 0;

let scoreAnterior = 0;
let scorePosterior = 0;
let scoreLeft = 0;
let scoreRight = 0;

// ... (rest of your code)
let surveyCompleted = localStorage.getItem('surveyCompleted');

function backs() {
  let surveyCompleted = localStorage.getItem('surveyCompleted');

  // Check if the survey has been completed
  if (surveyCompleted === 'false') {
    // Survey has already been completed, do not reset variables or redirect
    return;
  } else {
    // Remove relevant items from localStorage
    localStorage.clear();


    // Redirect to index.html
    window.location.href = 'index.html';
  }
}


function checkAndRedirect() {
  let surveyCompleted = localStorage.getItem('surveyCompleted');

  // Check if the survey has been completed
  if (surveyCompleted === 'true') {
    // Survey has already been completed, redirect to result.html
    window.location.href = 'result.html';
  }
}

// Call checkAndRedirect at the appropriate place in your code
// For example, you can call it in the startSurvey function

function result() {
  // ... (previous code)

  const conditions = ['Anterior', 'Posterior', 'Left', 'Right'];

  // Start with the first direction
  performDirection(conditions[0], conditions.slice(1));
}



function waitForAchievement(direction, remainingDirections) {
  let intervalId;

  function checkAchievement() {
    const newAngle = getLastUpdatedAngle(); // Implement a function to get the current angle
    const targetTilt = getTargetTiltForDirection(direction);

    if (newAngle === targetTilt) {
      clearInterval(intervalId);
      incrementScoreForDirection(direction);
      totalScore += scoreForDirection(direction);

      // Move to the next direction if there are remaining directions
      if (remainingDirections.length > 0) {
        performDirection(remainingDirections[0], remainingDirections.slice(1));
      } else {
        // All directions completed, calculate the final result
        calculateScore();

      }
    }
  }

  // Check for achievement every second
  intervalId = setInterval(checkAchievement, 1000);
}

function scoreForDirection(direction) {
  switch (direction) {
    case 'Anterior':
      return scoreAnterior;
    case 'Posterior':
      return scorePosterior;
    case 'Left':
      return scoreLeft;
    case 'Right':
      return scoreRight;
    default:
      return 0;
  }
}

function incrementScoreForDirection(direction) {
  switch (direction) {
    case 'Anterior':
      scoreAnterior += 1;
      break;
    case 'Posterior':
      scorePosterior += 1;
      break;
    case 'Left':
      scoreLeft += 1;
      break;
    case 'Right':
      scoreRight += 1;
      break;
  }
}

// ... (rest of your code)


function showQuestion(questionNumber) {
  const question = document.getElementById(`question${questionNumber}`);

  if (question) {
    // Hide all questions first
    const allQuestions = document.querySelectorAll('.question');
    allQuestions.forEach((q) => (q.style.display = 'none'));

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
  scoreAnterior = 0;
  scorePosterior = 0;
  scoreLeft = 0;
  scoreRight = 0;

  if (currentQuestion === 1) {
    backButton.style.display = 'none';
    nextButton.style.display = 'block';
    nextButton.innerHTML = 'Next';
  }

  else if (currentQuestion === finalQuestion) {
    backButton.style.display = 'block';
    nextButton.style.display = 'block';
    nextButton.innerHTML = 'Submit';
  } 
  
  else {
    backButton.style.display = 'block';
    nextButton.style.display = 'block';
    nextButton.innerHTML = 'Next';
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

function calculateScore(callback) {
  // Hide the survey container
  const surveyContainer = document.getElementById('surveyContainer');
  surveyContainer.style.display = 'none';

  // Store totalScore in localStorage
  localStorage.setItem('totalScore', totalScore);

  // Call the callback function (in this case, redirecting to result.html)
  if (typeof callback === 'function') {
    callback();
  }
}

function startSurvey() {
  let surveyCompleted = localStorage.getItem('surveyCompleted');

  if (surveyCompleted === 'true') {
    // Survey has already been completed, redirect to result.html
    window.location.href = 'result.html';
  } else {
    document.getElementById('imageContainer').style.display = 'none';
    document.getElementById('surveyContainer').style.display = 'block';
    showQuestion(currentQuestion);
  }
}

// In the function where you calculate the score (e.g., nextQuestion or prevQuestion), use calculateScore with a callback
function nextQuestion() {
  hideQuestion(currentQuestion);
  currentQuestion++;

  if (currentQuestion <= 15) {
    showQuestion(currentQuestion);
  } else {
    // Set survey completion status and redirect to result.html
    localStorage.setItem('surveyCompleted', 'true');
    calculateScore(function() {
      window.location.href = 'result.html';
    });
  }
}

// ... (previous code)

function result() {
  // Retrieve the totalScore from localStorage
  const totalScore = parseInt(localStorage.getItem('totalScore'), 10);

  // Display the total score
  const resultElement = document.getElementById('result');
  const conditionElement = document.getElementById('condition');

  resultElement.innerHTML = `<h2>Your Total Score: ${totalScore}</h2>`;

  // Display the condition based on the total score
  let targetTilts;
  if (totalScore <= 5) {
    conditionElement.innerHTML = `<h2>Your Condition is Minor</h2>`;
    // Perform exercises for Minor stage
    targetTilts = [6, 4, 8, 8];
    performExercises(12, targetTilts);
  } else if (totalScore >= 6 && totalScore <= 10) {
    conditionElement.innerHTML = `<h2>Your Condition is Mild</h2>`;
    // Perform exercises for Mild stage
    targetTilts = [8, 6, 10, 10];
    performExercises(10, targetTilts);
  } else if (totalScore >= 11 && totalScore <= 15) {
    conditionElement.innerHTML = `<h2>Your Condition is Moderate</h2>`;
    // Perform exercises for Moderate stage
    targetTilts = [10, 8, 12, 12];
    performExercises(8, targetTilts);
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

  // Determine the condition based on the total score


}


// ... (previous code)

// In the performExercises function:
function performExercises(count, targetTilts) {
  const anteriorTarget = [25, 30];
  const posteriorTarget = [16, 21];
  const leftTarget = [21, 26];
  const rightTarget = [21, 26];


  const conditions = ['Anterior', 'Posterior', 'Left', 'Right'];

  // Track completion status for each direction
  const completionStatus = {
    Anterior: false,
    Posterior: false,
    Left: false,
    Right: false,
  };

  // Loop through each direction
// ... (previous code)

// Loop through each direction
for (let i = 0; i < conditions.length; i++) {
  const direction = conditions[i];
  const targetTilt = targetTilts[i];
  const targetRange = eval(`${direction.toLowerCase()}Target`);

  // Display the target angle for the current direction

  // Check if the direction is completed before displaying progress
  if (completionStatus[direction]) {
      // Display a message to perform the next direction if not the last one
      if (i < conditions.length - 1) {
          exercisesElement.innerHTML += `<p>Move on to the next direction.</p>`;
      }
      continue;  // Skip evaluating score and progress for this direction if already completed
  }

  // Display the achieved score and progress for the current direction
  let achievedScore = getAchievedScore(targetRange, targetTilt, getCondition(totalScore));

  // Display the achieved score and progress for the current direction
  exercisesElement.innerHTML += `<p>Score for ${direction}: ${achievedScore}</p>`;

  // If the achieved score is 1, mark the direction as completed
  if (achievedScore.includes('Achieved')) {
      completionStatus[direction] = true;

      // Display a message to perform the next direction if not the last one
      if (i < conditions.length - 1) {
          exercisesElement.innerHTML += `<p>Move on to the next direction.</p>`;
      }
  }
}

// ... (remaining code)


  exercisesElement.innerHTML += '</ul>';
}

// In the getAchievedScore function:
// في الدالة getAchievedScore:
function getAchievedScore(targetRange, targetTilt, condition) {
  const newAngle = parseInt(localStorage.getItem('currentAngle'), 10);  // Initialize score and isAchieved variables
  let score = 0;
  let isAchieved = false;

  // Calculate the achieved range based on the condition for the current direction
  const achievedRange = calculateAchievedRange(targetRange, condition);

  // Check if the angle falls within the achieved range for the current direction
  isAchieved = newAngle >= achievedRange[0] && newAngle <= achievedRange[1];

  // Increment the score by 1 only if the achieved score is 0 and the target tilt is also 0
  if (isAchieved && targetTilt === 0) {
    score ++ ;
  }

  // Display "Achieved" when score becomes equal to targetTilt, otherwise "Not Achieved"
  const achievementStatus = isAchieved ? "Achieved" : "Not Achieved";

  // Calculate progress as a percentage
  const progress = (score / targetTilt) * 100;

  // Return the result for the current direction
  return `${achievementStatus} [(${score} / ${targetTilt}), Progress: ${isNaN(progress) ? 'NaN' : progress.toFixed(0)}%]`;
}


function getCondition(score) {
  if (score <= 5) {
    return 'Minor';
  } else if (score >= 6 && score <= 10) {
    return 'Mild';
  } else if (score >= 11 && score <= 15) {
    return 'Moderate';
  } else {
    return 'Not Suitable';
  }
}



function calculateAchievedRange(targetRange, condition) {
  // Calculate the achieved range based on the condition
  const rangeModifier = condition === 'Minor' ? 0 : condition === 'Mild' ? 1 : 2;
  const achievedRange = [targetRange[0] + rangeModifier, targetRange[1] + rangeModifier];

  return achievedRange;
}

function Tilting_Test() {
  window.location.href = 'Tilting_test.html';
}

function Buzzing_Wire_Test() {
  const totalScore = parseInt(localStorage.getItem('totalScore'), 10);
  const storedEndDate = localStorage.getItem('timerEndDate');

  if (storedEndDate) {
    // Timer end date is stored
    const retryDate = new Date(parseInt(storedEndDate, 10));
    const now = new Date();

    if (retryDate > now) {
      // Timer not ended, redirect to buz.html with saved date in local storage
      window.location.href = 'buz.html';
    } else {
      // Timer ended, remove saved date in local storage and redirect to result.html
      localStorage.removeItem('timerEndDate');
      window.location.href = 'result.html';
    }
  } else {
    // Timer end date not stored, proceed with the original behavior
    window.location.href = 'buzzing wire_test.html';
  }
}


function back() {
  window.location.href = 'result.html';
}


function test1() {
  
  window.location.href = 'test1.html';

}

function test2() {
  window.location.href = 'test2.html';
}

let lastUpdatedAngle = 0;
let isWaitingForZero = false;
let hasAchievedTarget = false;

// ... (previous code)

// ... (previous code)

async function updateAngle() {
  try {
    // Fetch data from ThingSpeak API
    const response = await fetch('https://api.thingspeak.com/channels/2383735/fields/1.json?results=1');
    const data = await response.json();

    // Extract the angle value from the response and parse it as an integer
    const newAngle = parseInt(data.feeds[0].field1);

    // Save the new angle in local storage
    localStorage.setItem('currentAngle', newAngle);

    // Display instruction when angle is 0
 
    // Check if the angle has returned to zero
    if (lastUpdatedAngle > 0 && newAngle === 0) {
      isWaitingForZero = true;
      hasAchievedTarget = false; // Reset the flag when the angle returns to zero
    }

    if (isWaitingForZero && newAngle !== 0) {
      // Check if the angle achieves the target
      const direction = getDirectionBasedOnAngle(newAngle);
      const targetTilt = calculateDynamicTargetTilt(direction, getCondition(totalScore));

      if (newAngle === targetTilt) {
        hasAchievedTarget = true;
      }
    }

    if (isWaitingForZero && hasAchievedTarget && newAngle === 0) {
      incrementScore();
      isWaitingForZero = false;
      hasAchievedTarget = false;
    }

    // Update the current angle value
    lastUpdatedAngle = newAngle;

    // Dynamically update progress targets based on the current condition
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// ... (rest of your code)

// Set interval to update the angle every 1 second
setInterval(updateAngle, 1000);

// ... (rest of the code)

function incrementScore() {
  totalScore += 1; // Increment the score when the angle achieves the target
}

setInterval(updateAngle, 1000);

updateAngle();





function buz()
{
  const totalScore = parseInt(localStorage.getItem('totalScore'), 10);
  let maxAttempts; // Change this value as needed

  let attemptsInput = document.getElementById('attemptsInput').value;
  if (totalScore <= 5) {
    maxAttempts = 5;
  } else if (totalScore >= 6 && totalScore <= 10) {
    maxAttempts = 7;
  } else if (totalScore >= 11 && totalScore <= 15) {
    maxAttempts = 9;
  }


    if (attemptsInput <= maxAttempts) {
      localStorage.setItem('buzCompleted', 'true');

      window.location.href = 'buz.html';
    }
    else{
      let comtinue = document.getElementById('comtinue');
      // You may need to fetch the current test number from somewhere or calculate it based on completed tests
      let currentTestNumber = 1; // Replace with your logic to get the current test number
    
      comtinue.innerHTML = `very Good , You Can Continue`;
    }
}


function checkAndbuz() {
  let buzCompleted = localStorage.getItem('buzCompleted');

  // Check if the survey has been completed
  if (buzCompleted === 'true') {
    // Survey has already been completed, redirect to result.html
    window.location.href = 'buz.html';
  }
  else {
    localStorage.removeItem('timerEndDate');
    window.location.href = 'test2.html';

  }
}
function startCountdown() {
  // Retrieve the timer end date from local storage
  let storedEndDate = localStorage.getItem('timerEndDate');

  // If a stored end date exists and it is in the future, use it; otherwise, calculate a new end date
  let retryDate = storedEndDate ? new Date(parseInt(storedEndDate, 10)) : calculateNewEndDate();

  function calculateNewEndDate() {
      // Calculate retry date as 24 hours from the current date
      let newRetryDate = new Date();
      newRetryDate.setHours(newRetryDate.getHours() + 48);
      return newRetryDate;
  }

  function updateTimer() {
      let now = new Date();
      let timeDifference = retryDate - now;
      let timerElement = document.getElementById('timer');

      let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;

      // Save the updated timer end date in local storage
      localStorage.setItem('timerEndDate', retryDate.getTime());

      displayTestNumber();
  }

  // Update the timer only when needed, i.e., when the retry date is in the future
  if (retryDate > new Date()) {
      let timerInterval = setInterval(updateTimer, 1000);
      // Initial update
      updateTimer();
  }
}



function displayTestNumber() {
  let testNumberDisplay = document.getElementById('test_number');
  // You may need to fetch the current test number from somewhere or calculate it based on completed tests
  let currentTestNumber = 1; // Replace with your logic to get the current test number

  testNumberDisplay.innerHTML = `The test number is: ${currentTestNumber}/18`;
}
// ... (the rest of your code remains unchanged)

// ... (the rest of your code remains unchanged)

// Display the retry date
function displayRetryDate(retryDate) {
  let retryDateDisplay = document.getElementById('retryDateDisplay');
  let options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
    timeZoneName: 'short'
  };
  let formattedRetryDate = retryDate.toLocaleDateString('en-US', options);

  retryDateDisplay.innerHTML = `Retry Available on: ${formattedRetryDate}`;
}

function showImages() {
  let totalScore = parseInt(localStorage.getItem('totalScore'), 10);

  // Hide all images by default
  document.getElementById('imageMinor').style.display = 'none';
  document.getElementById('imageMild').style.display = 'none';
  document.getElementById('imageModerate').style.display = 'none';

  document.getElementById('try').style.display = 'block';
  document.getElementById('enter').style.display = 'block';
  if (totalScore <= 5) {
    document.getElementById('imageMinor').style.display = 'block';
  } else if (totalScore >= 6 && totalScore <= 10) {
    document.getElementById('imageMild').style.display = 'block';
  } else if (totalScore >= 11 && totalScore <= 15) {
    document.getElementById('imageModerate').style.display = 'block';
  }

  result();

  let retryDate = new Date(localStorage.getItem('retryDate'));

  if (retryDate <= new Date()) {
    // If the retry date has passed, show the input box and send button
    document.getElementById('enter').style.display = 'block';
  }
  checkAttempts();
}


document.getElementById('Buzzing_Wire_Test').addEventListener('click', function () {
  checkAttempts();
});














// Function to send data to ThingSpeak
function sendDataToThingSpeak(value) {
  var apiKey = "H2YD9PEQ87IRWQV6";
  var channelID = "2383735";
  var apiUrl = "https://api.thingspeak.com/update.json";
  currentAngle = parseFloat(value);

  var data = {
      api_key: apiKey,
      field1: value
  };

  $.ajax({
      type: "POST",
      url: apiUrl + "?api_key=" + apiKey,
      data: data,
      success: function (response) {
          console.log("Data sent to ThingSpeak successfully");
      },
      error: function (error) {
          console.error("Error sending data to ThingSpeak:", error);
      }
  });
}

// Function to auto-refresh the iframe every 30 seconds
function autoRefresh() {
  var iframe = document.getElementById("thingSpeakWidget");
  iframe.src = iframe.src;
 
}

// Set the auto-refresh interval
setInterval(autoRefresh, 30000);

// Function to update the position of the red circle based on the direction and angle
function updateCirclePosition(angle, direction) {
  var circle = document.getElementById("redCircle");
  var radius = 50;

  // Define target angles for each direction
  var targetAngles = {
    'Anterior': { min: 25, max: 30 },
    'Posterior': { min: 16, max: 21 },
    'Left': { min: 21, max: 26 },
    'Right': { min: 21, max: 26 }
  };

  // Calculate the new position based on the angle and direction

  // Update the circle's position
  circle.setAttribute("cx", newX);
  circle.setAttribute("cy", newY);

  // Check if the angle is within the target range for the current direction

  // Move the red circle based on the direction
  if (isWithinTargetRange) {
    switch (direction) {
      case 'Anterior':
        // Move the red circle to the top of the blue circle
        circle.setAttribute("cy", 0);
        break;
      case 'Posterior':
        // Move the red circle to the bottom of the blue circle
        circle.setAttribute("cy", 0);
        break;
      case 'Left':
        // Move the red circle to the left of the blue circle
        circle.setAttribute("cx", 0);
        break;
      case 'Right':
        // Move the red circle to the right of the blue circle
        circle.setAttribute("cx", 100);
        break;
    }
  }
}

// Function to handle button click
function addButtonClick() {
  var inputValue = document.getElementById("inputField").value;
  sendDataToThingSpeak(inputValue);
}

// Function to handle the back button click

// Function to handle the initial result
