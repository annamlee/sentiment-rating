document.addEventListener('DOMContentLoaded', () => {
  // Reset emotions to all 0s
  emotions = {
    upset: 0,
    unhappy: 0,
    neutral: 0,
    happy: 0,
    joyful: 0,
    total: 0
  };

  // Reset the percentages in the HTML
  Object.keys(emotions).forEach(emotion => {
    if (emotion !== "total") {
      const pctElement = document.getElementById(`${emotion}_pct`);
      pctElement.textContent = `0% are feeling ${emotion}`;
    }
  });

  const form = document.querySelector('.meter');
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Prevent form submission
    submitSentiment();
  });
});


function submitSentiment() {
  const selectedEmotion = document.querySelector('input[name="feeling"]:checked').value;

  emotions[selectedEmotion]++;
  emotions["total"]++;

  // Update the percentages in the HTML
  const total = emotions["total"];
  Object.keys(emotions).forEach(emotion => {
    if (emotion !== "total") {
      const pctElement = document.getElementById(`${emotion}_pct`);
      const percentage = emotions[emotion] / total * 100;
      pctElement.textContent = `${percentage.toFixed(2)}% are feeling ${emotion}`;
    }
  });

  // Store the emotions object in localStorage
  localStorage.setItem('emotions', JSON.stringify(emotions));
}
