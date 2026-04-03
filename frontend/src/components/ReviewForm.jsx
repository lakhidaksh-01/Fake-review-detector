import { useState } from "react";

export default function ReviewForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeReview = async () => {
    if (!text) return alert("Enter review text");

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/reviews/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      const data = await res.json();
      setResult(data.result);
    } catch (err) {
      console.error(err);
      alert("Backend connection error");
    }

    setLoading(false);
  };

  return (
   <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
  <div className="w-full max-w-2xl bg-white rounded-2xl shadow-xl p-8 border border-gray-200">

    {/* Title */}
    <h1 className="text-3xl font-bold text-gray-800 text-center mb-2">
      Fake Review Detector
    </h1>
    <p className="text-center text-gray-500 mb-6">
      Paste any product or service review to analyse its authenticity.
    </p>

    {/* Input */}
    <textarea
      className="w-full h-32 p-4 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition resize-none text-gray-700"
      placeholder="Paste a review here..."
      value={text}
      onChange={(e) => setText(e.target.value)}
    />

    {/* Button */}
    <button
      onClick={analyzeReview}
      className="mt-4 w-full py-3 rounded-xl bg-green-600 hover:bg-green-700 text-white font-semibold transition shadow-md"
    >
      {loading ? "Analyzing..." : "Analyze Review"}
    </button>

    {/* Result */}
    {result && (
      <div className="mt-8 border-t pt-6">

        <h2 className="text-lg font-semibold text-gray-800 mb-4">
          Analysis Result
        </h2>

        {/* Scores */}
        <div className="grid grid-cols-2 gap-4 mb-6">
          
          <div className="bg-red-50 p-4 rounded-xl border border-red-100">
            <p className="text-sm text-gray-500">Fake Probability</p>
            <p className="text-2xl font-bold text-red-500">
              {(result.fake_probability * 100).toFixed(2)}%
            </p>
          </div>

          <div className="bg-green-50 p-4 rounded-xl border border-green-100">
            <p className="text-sm text-gray-500">Trust Score</p>
            <p className="text-2xl font-bold text-green-600">
              {(result.trust_score * 100).toFixed(2)}%
            </p>
          </div>

        </div>

        

      </div>
    )}
  </div>
</div>
  );
}
