async function getGPTResponse(prompt) {
  const replyBox = document.getElementById("gpt-reply-box");
  const replyText = document.getElementById("gpt-reply-text");

  replyText.innerText = "Thinking...";
  replyBox.style.display = "block";

  try {
    const response = await fetch('/.netlify/functions/gpt-handler', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt })
    });

    const data = await response.json();
    const reply = data.choices?.[0]?.message?.content || "No response from GPT.";
    replyText.innerText = reply;
    replyBox.scrollIntoView({ behavior: "smooth" });

  } catch (err) {
    replyText.innerText = "⚠️ GPT error: " + err.message;
    replyBox.scrollIntoView({ behavior: "smooth" });
  }
}
