document.addEventListener('DOMContentLoaded', () => {
  const languageSelect = document.getElementById('language');
  const greeting = document.querySelector('.greeting h2');
  const micBtn = document.getElementById('mic-btn');
  const speechText = document.getElementById('speech-text');
  const darkToggle = document.getElementById('dark-toggle');

  const translations = {
    en: "Welcome, Hope,<br><span>Let’s grow today.</span>",
    ha: "Barka da zuwa, Hope,<br><span>Mu ci gaba yau.</span>",
    ig: "Nnọọ, Hope,<br><span>Ka nọ rie taa.</span>",
    yo: "Kaabọ, Hope,<br><span>Ẹ jẹ́ kí a dagbasoke lónìí.</span>",
    sw: "Karibu, Hope,<br><span>Tukue leo.</span>",
    fr: "Bienvenue, Hope,<br><span>Faisons des progrès aujourd’hui.</span>",
    ar: "مرحبًا، Hope،<br><span>لنتقدم اليوم.</span>",
    zu: "Siyakwamukela, Hope,<br><span>Ake sikhule namhlanje.</span>",
    pg: "You don show, Hope,<br><span>Make we move today.</span>"
  };

  languageSelect.addEventListener('change', () => {
    const selectedLang = languageSelect.value;
    if (translations[selectedLang]) {
      greeting.innerHTML = translations[selectedLang];
    }
  });

  micBtn.addEventListener('click', () => {
    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = 'en-US';
    recognition.interimResults = false;

    recognition.onstart = () => {
      speechText.innerText = "[Listening...]";
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      speechText.innerText = transcript;
      getGPTResponse(transcript);
    };

    recognition.onerror = (event) => {
      speechText.innerText = "[Error]: " + event.error;
    };

    recognition.start();
  });

  darkToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
  });

  async function getGPTResponse(prompt) {
    try {
      const response = await fetch('/.netlify/functions/gpt-handler', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt })
      });
      const data = await response.json();
      alert("🤖 SmartQ says:
" + data.reply);
    } catch (err) {
      alert("⚠️ GPT error: " + err.message);
    }
  }
});
