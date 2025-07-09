async function getGPTResponse(prompt) {
  try {
    const response = await fetch('/.netlify/functions/gpt-handler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();

    const reply = data.choices?.[0]?.message?.content || "No response from GPT.";
    alert("🤖 SmartQ says:\n" + reply);
  } catch (err) {
    alert("⚠️ GPT error: " + err.message);
  }
}
