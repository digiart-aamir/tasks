const transcriptDiv = document.getElementById('transcript');

const speechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
const recognition = new speechRecognition();

const startBtn = document.getElementById('start');
startBtn.addEventListener('click', () => {
  recognition.start();
}); 

recognition.addEventListener('result', (e) => {
  const transcript = Array.from(e.results)
    .map(result => result[0]) 
    .map(result => result.transcript)
    .join('');

  transcriptDiv.innerHTML = transcript;
  
  // New code

  const speech = new SpeechSynthesisUtterance(transcript);
  speech.volume = 1;
  speech.rate = 1; 
  speech.pitch = 1;

  window.speechSynthesis.speak(speech);
});

const claudeEndpoint = 'https://api.anthropic.com/v1/claude'; 

recognition.addEventListener('result', async (e) => {
 
 
  // Call Claude API
  const response = await fetch(claudeEndpoint, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CLAUDE_API_KEY}`,  
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ 
      message: transcript
    })
  });
   
  const claudeResponse = await response.json();

  // claudeResponse.text has Claude's response

});