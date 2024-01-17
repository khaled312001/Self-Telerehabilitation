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

function performDirection(direction, remainingDirections) {
  const targetTilt = getTargetTiltForDirection(direction);
  
  // Display instructions and target angles for the current direction
  document.getElementById('exercises').innerHTML = `
    <h2>Focus on the point and lean your body in ${direction.toLowerCase()} direction</h2>
    <ul>
      <li>${targetTilt} of ${direction} target angle: ${getTargetRangeForDirection(direction).join(':')} degrees</li>
    </ul>
    <p>Score for ${direction}: ${getScoreDisplay(0, targetTilt)}</p>
  `;

  // Wait for the user to achieve the target before moving to the next direction
  waitForAchievement(direction, remainingDirections);
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

// ... (rest of your code)

function performExercises(count, targetTilts) {
  const anteriorTarget = [25, 30];
  const posteriorTarget = [16, 21];
  const leftTarget = [21, 26];
  const rightTarget = [21, 26];

  const exercisesElement = document.getElementById('exercises');
  exercisesElement.innerHTML = '<h2>Perform the following exercises:</h2><ul>';

  // Display the target angles for each direction
  exercisesElement.innerHTML += `<li>${targetTilts[0]} of Anterior target angle: ${anteriorTarget[0]}:${anteriorTarget[1]} degrees</li>`;
  exercisesElement.innerHTML += `<li>${targetTilts[1]} of Posterior target angle: ${posteriorTarget[0]}:${posteriorTarget[1]} degrees</li>`;
  exercisesElement.innerHTML += `<li>${targetTilts[2]} of Left target angle: ${leftTarget[0]}:${leftTarget[1]} degrees</li>`;
  exercisesElement.innerHTML += `<li>${targetTilts[3]} of Right target angle: ${rightTarget[0]}:${rightTarget[1]} degrees</li>`;
  exercisesElement.innerHTML += '</ul>';

  // Display the achieved score for each direction
  const conditions = ['Anterior', 'Posterior', 'Left', 'Right'];
  conditions.forEach((direction, index) => {
    let achievedScore = getAchievedScore(lastUpdatedAngle, eval(`${direction.toLowerCase()}Target`), targetTilts[index], getCondition(totalScore));
    exercisesElement.innerHTML += `<p>Score for ${direction}: ${achievedScore}</p>`;

  });

}



function getScoreDisplay(score, targetTilt) {
  
  return score > 0 ? `Achieved (${score} / ${targetTilt})` : `Not Achieved`;
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

function getAchievedScore(angle, targetRange, targetTilt, condition) {
  // Calculate the achieved range based on the condition
  const achievedRange = calculateAchievedRange(targetRange, condition);

  // Check if the angle falls within the achieved range
  const isAchieved = angle >= achievedRange[0] && angle <= achievedRange[1];

  // Initialize score to 0
  let score = 0;

  if (isAchieved) {
    // If achieved, set score to 1 (or any other value as needed)
    score = 1;
    return `Achieved (${score} / ${targetTilt})`;
  } else {
    // If not achieved, set score to 0
    score = 0;
    return `Not Achieved (${score} / ${targetTilt})`;
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
  window.location.href = 'buzzing wire_test.html';
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

async function updateAngle() {
  try {
    // Fetch data from ThingSpeak API
    const response = await fetch('https://api.thingspeak.com/channels/2383735/fields/1.json?results=1');
    const data = await response.json();

    // Extract the angle value from the response and parse it as an integer
    const newAngle = parseInt(data.feeds[0].field1);

    // Display instruction when angle is 0
    if (newAngle === 0) {
      document.getElementById('exercises').innerHTML = `
        <h2>Focus on the point and lean your body forward, backward, right, and left to achieve your goal</h2>
        <h2>Perform the following exercises:</h2>
        <ul>
          <li>8 of Anterior target angle: 25:30 degrees</li>
          <li>6 of Posterior target angle: 16:21 degrees</li>
          <li>10 of Left target angle: 21:26 degrees</li>
          <li>10 of Right target angle: 21:26 degrees</li>
        </ul>
        <p>Score for Anterior: ${getScoreDisplay(scoreAnterior, 8)}</p>
        <p>Score for Posterior: ${getScoreDisplay(scorePosterior, 6)}</p>
        <p>Score for Left: ${getScoreDisplay(scoreLeft, 10)}</p>
        <p>Score for Right: ${getScoreDisplay(scoreRight, 10)}</p>
      `;
    }

    // Check if the angle has returned to zero
    if (lastUpdatedAngle > 0 && newAngle === 0) {
      isWaitingForZero = true;
      hasAchievedTarget = false; // Reset the flag when the angle returns to zero
    }

    if (isWaitingForZero && newAngle !== 0) {
      // Check if the angle achieves the target
      const direction = getDirectionBasedOnAngle(newAngle); // Implement your logic to determine the direction based on the angle
      const targetTilt = calculateDynamicTargetTilt(direction, getCondition(totalScore));

      if (newAngle === targetTilt) {
        hasAchievedTarget = true;
      }
    }

    if (isWaitingForZero && hasAchievedTarget && newAngle === 0) {
      incrementScore(); // Increment the score when the angle achieves the target
      isWaitingForZero = false; // Reset the flag
      hasAchievedTarget = false; // Reset the flag
    }

    // Update the current angle value
    lastUpdatedAngle = newAngle;

    // Dynamically update progress targets based on the current condition
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

// ... (rest of the code)

function incrementScore() {
  totalScore += 1; // Increment the score when the angle achieves the target
}

setInterval(updateAngle, 1000);

updateAngle();




var maxAttempts; // Change this value as needed
var retryCooldown = 2; // Number of days to wait for a retry
var currentDate;

function checkAttempts() {
  let attemptsInput = document.getElementById('attemptsInput').value;
  let totalScore = parseInt(localStorage.getItem('totalScore'), 10);

  if (totalScore <= 5) {
    maxAttempts = 5;
  } else if (totalScore >= 6 && totalScore <= 10) {
    maxAttempts = 7;
  } else if (totalScore >= 11 && totalScore <= 15) {
    maxAttempts = 9;
  }

  let condition = document.getElementById('condition').innerText;
  if (attemptsInput <= maxAttempts) {
    let retryDate = new Date(currentDate);


    document.getElementById('countdown').style.display = 'block';
    startCountdown(retryDate);
    document.getElementById('imageMinor').style.display = 'none';
    document.getElementById('imageMild').style.display = 'none';
    document.getElementById('imageModerate').style.display = 'none';
    document.getElementById('try').style.display = 'none';
    document.getElementById('enter').style.display = 'none';
  
  } else {
    document.getElementById('countdown').style.display = 'none';
showImages();
    displayTestNumber();
  }
}

document.addEventListener('DOMContentLoaded', function () {
  currentDate = new Date(); // Set the current date when the document is loaded

  // Check for stored timer data
  let storedTimerEndDate = localStorage.getItem('timerEndDate');

  if (storedTimerEndDate) {
    let retryDate = new Date(parseInt(storedTimerEndDate, 10));

    if (retryDate > new Date()) {
      // If the retry date is in the future, show the countdown
      document.getElementById('countdown').style.display = 'block';
      startCountdown(retryDate);
      
    } else {
      // If the retry date has passed, show the images, input box, and send button
      showImages();
    }
  } else {
    // If there's no stored timer data, show the images, input box, and send button
    showImages();
  }
});

function startCountdown(endDate) {
  let timerElement = document.getElementById('timer');

  function updateTimer() {
    let now = new Date();
    let timeDifference = endDate - now;

    if (timeDifference <= 0) {
      // Show the images when the countdown is done
      showImages();
      clearInterval(timerInterval); // Stop the timer interval
      localStorage.removeItem('timerEndDate'); // Remove stored timer data
    } else {
      // Update the countdown
      let days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
      let hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

      timerElement.innerHTML = `${days}d ${hours}h ${minutes}m ${seconds}s`;
      localStorage.setItem('timerEndDate', endDate.getTime()); // Store countdown end date
      displayTestNumber()
    }
  }

  // Update the timer only when needed, i.e., when the retry date is in the future
  if (endDate > new Date()) {
    // Update the timer every second
    let timerInterval = setInterval(updateTimer, 1000);

    // Initial update
    updateTimer();
  }
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

  if (totalScore <= 5) {
    document.getElementById('imageMinor').style.display = 'block';
  } else if (totalScore >= 6 && totalScore <= 10) {
    document.getElementById('imageMild').style.display = 'block';
  } else if (totalScore >= 11 && totalScore <= 15) {
    document.getElementById('imageModerate').style.display = 'block';
  }

  document.getElementById('try').style.display = 'block';
  document.getElementById('enter').style.display = 'block';

  let retryDate = new Date(localStorage.getItem('retryDate'));

  if (retryDate <= new Date()) {
    // If the retry date has passed, show the input box and send button
    document.getElementById('enter').style.display = 'block';
  }
  checkAttempts();
  result();
}

document.getElementById('Buzzing_Wire_Test').addEventListener('click', function () {
  checkAttempts();
});

// ... (the rest of your code remains unchanged)

// In your code, make sure to call startCountdown with the correct end date when necessary, such as after a user submits an attempt or when starting a new attempt.

// For example, after a user successfully submits an attempt:
// let retryDate = new Date();
// retryDate.setDate(retryDate.getDate() + retryCooldown);
// startCountdown(retryDate);





// Display the test number
function displayTestNumber() {
  let testNumberDisplay = document.getElementById('test_number');
  // You may need to fetch the current test number from somewhere or calculate it based on completed tests
  let currentTestNumber = 1; // Replace with your logic to get the current test number

  testNumberDisplay.innerHTML = `The test number is: ${currentTestNumber}/18`;
}










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
