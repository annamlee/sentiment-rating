let emotions = {
    upset: 0,
    unhappy: 0,
    neutral: 0,
    happy: 0,
    joyful: 0,
    total: 0
  };
  
  function submitSentiment(event) {
    //get the emotion submitted
    const selectedEmotion = document.querySelector('input[name="feeling"]:checked').value;
  
    //update the counts of the emotion and total
    emotions[selectedEmotion]++;
    emotions["total"]++;
  
    
    
    const breakdown = document.getElementById("breakdown");
    Object.keys(emotions).forEach(emotion => {
    if (emotion !== "total") {
      const pctElement = document.getElementById(`${emotion}_pct`);
      const percentage = emotions[emotion] / emotions["total"] * 100;
      pctElement.textContent = `${percentage.toFixed(2)}% of people are feeling ${emotion}`;
    }
  });
  }
  
    
    