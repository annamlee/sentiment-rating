//Function to load emotions from local storage (also to initialize emotions)
function loadEmotions() {
  const storedEmotion = localStorage.getItem("emotions");
  if (storedEmotion != undefined){
    return JSON.parse(storedEmotion);
  } else {
    return {
      upset: 0,
      unhappy: 0,
      neutral: 0,
      happy: 0,
      joyful: 0,
      total: 0  
    }
  }
}

// Initializes the emotion object
let emotions = loadEmotions();

//Function that deletes all local storage
function resetStorage(){
  localStorage.clear();
  emotions = {
    upset: 0,
    unhappy: 0,
    neutral: 0,
    happy: 0,
    joyful: 0,
    total: 0
  };

  //Updates the percentages to 0 in the html
  updatePercentages(emotions, 0);
}

//Event listener for resetting
const resetButton = document.getElementById("reset");
resetButton.addEventListener("click", () =>{
  resetStorage();
});

// Function to update the percentages in the HTML
function updatePercentages(emotions, total) {
  Object.keys(emotions).forEach(emotion => {
    if (emotion !== "total") {
      const pctElement = document.getElementById(`${emotion}_pct`);
      const percentage = total === 0 ? 0 : Math.round(emotions[emotion] / total * 100);
      pctElement.textContent = `${percentage}%`;
    }
  });
}

// Event listener for form submission
const form = document.querySelector('.meter');
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log("Form submitted");

  const selectedRadio = document.querySelector('input[name="feeling"]:checked');
  if (selectedRadio) {
    const selectedEmotion = selectedRadio.value;
    emotions[selectedEmotion]++;
    emotions["total"]++;

    // Saves the number to the localStorage
    localStorage.setItem("emotions", JSON.stringify(emotions));

    // Update the percentages in the HTML
    const total = emotions["total"];
    updatePercentages(emotions, total);

    // Reset the radio button to be unchecked
    selectedRadio.checked = false;
  } else {
    console.log("No option selected");
  }
});


// Update percentages when page loads
document.addEventListener('DOMContentLoaded', updatePercentages(emotions, emotions["total"]), false);


// Function to load emotions from local storage (also to initialize emotions)
function loadEmotions() {
  const storedEmotion = localStorage.getItem("emotions");
  if (storedEmotion !== null) {
      return JSON.parse(storedEmotion);
  } else {
      return {
          upset: 0,
          unhappy: 0,
          neutral: 0,
          happy: 0,
          joyful: 0,
          total: 0
      }
  }
}

//TESTING - I have commented out the method of actually calling the test since we dont have to do testing every time the app is run

// Test code for loadEmotions
function testLoadEmotions() {
  // Mock localStorage
  const localStorageMock = (() => {
      let store = {};
      return {
          getItem(key) {
              return store[key] || null;
          },
          setItem(key, value) {
              store[key] = value.toString();
          },
          clear() {
              store = {};
          }
      };
  })();

  // Replace the global localStorage with our mock
  Object.defineProperty(window, 'localStorage', { value: localStorageMock });

  // Test case 1: localStorage is empty
  localStorage.clear();
  let emotions = loadEmotions();
  if (JSON.stringify(emotions) === JSON.stringify({ upset: 0, unhappy: 0, neutral: 0, happy: 0, joyful: 0, total: 0 })) {
      console.log('Test Passed: Empty localStorage initializes correct emotions object');
  } else {
      console.error('Test Failed: Should initialize empty emotions object');
  }

  // Test case 2: localStorage has data
  localStorage.setItem('emotions', JSON.stringify({ upset: 1, unhappy: 2, neutral: 3, happy: 4, joyful: 5, total: 15 }));
  emotions = loadEmotions();
  if (emotions.total === 15 && emotions.joyful === 5) {
      console.log('Test Passed: Emotions loaded correctly from localStorage');
  } else {
      console.error('Test Failed: Should load emotions correctly from localStorage');
  }
}

function testUIPercentageUpdate() {
  // Clear existing local storage to ensure a clean test environment
  localStorage.clear();

  // Manually set initial emotions to simulate one happy entry
  const initialEmotions = { upset: 0, unhappy: 0, neutral: 0, happy: 0, joyful: 0, total: 0 };
  localStorage.setItem('emotions', JSON.stringify(initialEmotions));
  loadEmotions(); // Load initial emotions, ensure UI is in sync

  // Simulate another happy submission
  document.querySelector('input[name="feeling"][value="happy"]').checked = true;
  document.querySelector('.meter').dispatchEvent(new Event('submit'));

  // Fetch updated emotions from storage
  const updatedEmotions = JSON.parse(localStorage.getItem('emotions'));
  const expectedPercentage = Math.round((updatedEmotions.happy / updatedEmotions.total) * 100);

  // Check if the UI is updated correctly
  const happyPct = document.getElementById('happy_pct').textContent;
  if (happyPct === `${expectedPercentage}%`) {
      console.log('Test Passed: UI percentages updated correctly after form submission');
  } else {
      console.error(`Test Failed: Expected ${expectedPercentage}%, got ${happyPct}`);
  }

  // Clean up - uncheck radio and clear local storage
  document.querySelector('input[name="feeling"][value="happy"]').checked = false;
  localStorage.clear();
}

function testResetFunctionality() {
  // Setup - simulate some emotions and a total
  localStorage.setItem('emotions', JSON.stringify({ upset: 2, unhappy: 1, neutral: 3, happy: 4, joyful: 5, total: 15 }));

  // Trigger reset
  document.getElementById('reset').click();

  // Check if local storage is cleared or properly reset
  const emotionsRaw = localStorage.getItem('emotions');
  const emotions = emotionsRaw ? JSON.parse(emotionsRaw) : null;
  const allZeros = emotions ? Object.values(emotions).every(value => value === 0) : true;
  const totalIsZero = emotions ? emotions.total === 0 : true;

  // Check UI reset
  const happyPct = document.getElementById('happy_pct').textContent;
  if (allZeros && totalIsZero && happyPct === '0%') {
      console.log('Test Passed: Reset functionality clears emotions and updates UI correctly');
  } else {
      console.error('Test Failed: Reset functionality did not clear emotions or update UI correctly');
  }
}

function testUpdatePercentagesMath() {
  // Setup - simulate some emotions
  const testEmotions = {
      upset: 1,
      unhappy: 2,
      neutral: 3,
      happy: 4,
      joyful: 5,
      total: 15  // Total is the sum of all emotions
  };
  localStorage.setItem('emotions', JSON.stringify(testEmotions));
  const loadedEmotions = loadEmotions();  // Should load the test emotions from localStorage

  // Inject dummy elements to mimic the HTML structure for displaying percentages
  ['upset', 'unhappy', 'neutral', 'happy', 'joyful'].forEach(emotion => {
      const pctElement = document.createElement('div');
      pctElement.id = `${emotion}_pct`;
      document.body.appendChild(pctElement);
  });

  // Call the function under test
  updatePercentages(loadedEmotions, loadedEmotions.total);

  // Check each emotion percentage and log results
  let allTestsPassed = true;
  Object.keys(loadedEmotions).forEach(emotion => {
      if (emotion !== 'total') {
          const expectedPct = Math.round((loadedEmotions[emotion] / loadedEmotions.total) * 100);
          const actualPct = document.getElementById(`${emotion}_pct`).textContent;
          const result = `${expectedPct}%`;
          if (actualPct === result) {
              console.log(`Test Passed for ${emotion}: Correctly calculated ${actualPct}`);
          } else {
              console.error(`Test Failed for ${emotion}: Expected ${result}, but got ${actualPct}`);
              allTestsPassed = false;
          }
      }
  });

  // Clean up - remove dummy elements
  ['upset', 'unhappy', 'neutral', 'happy', 'joyful'].forEach(emotion => {
      const pctElement = document.getElementById(`${emotion}_pct`);
      pctElement.parentNode.removeChild(pctElement);
  });

  if (allTestsPassed) {
      console.log('All tests passed: All percentages are correctly calculated.');
  }
}


//CALLING THE TEST FUNCTIONS

// testUIPercentageUpdate();
// testLoadEmotions();
// testResetFunctionality();
// testUpdatePercentagesMath();

