console.log("JS LOADED");

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("analyzeBtn").addEventListener("click", analyze);
});

async function analyze() {
  const review = document.getElementById("review").value;
  const btn = document.getElementById("analyzeBtn");

  if (!review.trim()) {
    alert("Please enter a review");
    return;
  }

  btn.disabled = true;
  btn.innerText = "Analyzing...";

  try {
    const res = await fetch("http://127.0.0.1:8000/predict", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ text: review })
    });

    const data = await res.json();

    document.getElementById("fakeScore").innerText = data.fake_probability.toFixed(2);
    document.getElementById("trustScore").innerText = data.trust_score.toFixed(2);
    document.getElementById("explanation").innerText =
      data.explanation || "";

    document.getElementById("result").classList.remove("hidden");

  } catch (err) {
    console.error(err);
    alert("Backend not running 😬");
  }

  btn.disabled = false;
  btn.innerText = "Analyze";
}