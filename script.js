let currentQuestion = 1;
let totalScore = 0;
let currentAngle = 0;

let scoreAnterior = 0;
let scorePosterior = 0;
let scoreLeft = 0;
let scoreRight = 0;

// ... (rest of your code)


function startSurvey() {
  document.getElementById('imageContainer').style.display = 'none';
  document.getElementById('surveyContainer').style.display = 'block';
  showQuestion(currentQuestion);
}

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
  document.getElementById('imageContainer').style.display = 'none';
  document.getElementById('surveyContainer').style.display = 'block';
  showQuestion(currentQuestion);
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
function showImage()
{
  document.getElementById('imageMinor').style.display = 'none';
  document.getElementById('imageMild').style.display = 'none';
  document.getElementById('imageModerate').style.display = 'none';
  const not = document.getElementById('not');


  let condition;
  if (totalScore <= 5) {
    document.getElementById('imageMinor').style.display = 'block';
  } else if (totalScore >= 6 && totalScore <= 10) {
    document.getElementById('imageMild').style.display = 'block';
  } else if (totalScore >= 11 && totalScore <= 15) {
    document.getElementById('imageModerate').style.display = 'block';
  } else {
    not.innerHTML = `<h2>Sorry, this system is not suitable for you</h2>`;

  }
  result();

  
  
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
    const achievedScore = getAchievedScore(lastUpdatedAngle, eval(`${direction.toLowerCase()}Target`), targetTilts[index], getCondition(totalScore));
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

function backs() {
  window.location.href = 'index.html';
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






// ... (your existing code)

