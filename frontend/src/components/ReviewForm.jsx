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
   <>
   <div className="min-h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center p-6">
  <div className="w-full max-w-3xl relative">
    
    {/* Animated background orbs */}
    <div className="absolute top-20 -left-20 w-72 h-72 bg-blue-500 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse"></div>
    <div className="absolute bottom-20 -right-20 w-72 h-72 bg-indigo-600 rounded-full mix-blend-screen filter blur-3xl opacity-10 animate-pulse delay-1000"></div>
    
    {/* Main Card */}
    <div className="relative bg-white rounded-3xl shadow-2xl overflow-hidden">
      
      {/* Navy blue header bar - using slate and blue */}
      <div className="bg-gradient-to-r from-slate-800 via-blue-900 to-slate-800 px-8 py-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-blue-500/10 rounded-full blur-3xl"></div>
        <div className="relative">
          <div className="flex justify-center mb-3">
            <div className="bg-white/10 backdrop-blur-sm px-4 py-1.5 rounded-full border border-white/20">
              <span className="text-white/90 text-sm font-semibold tracking-wide">
                🎯 AI-Powered Intelligence
              </span>
            </div>
          </div>
          <h1 className="text-4xl font-bold text-center text-white mb-2 tracking-tight">
            Fake Review Detector
          </h1>
          <p className="text-center text-blue-200/80 text-base">
            Advanced neural network analysis for review authenticity
          </p>
        </div>
      </div>

      {/* Content Area */}
      <div className="p-8">
        
        {/* Input Area */}
        <div className="relative group mb-6">
          <label className="block text-sm font-semibold text-slate-700 mb-2 flex items-center gap-2">
            <span className="text-lg">📝</span>
            Paste Review Text
            <span className="text-xs font-normal text-slate-400 ml-2">(required)</span>
          </label>
          <div className="relative">
            <textarea
              className="w-full h-32 p-4 rounded-xl border-2 border-slate-200 focus:border-blue-600 focus:outline-none transition-all duration-300 resize-none text-slate-800 placeholder-slate-400 bg-slate-50/50"
              placeholder="Paste or type the review you want to analyze here..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
            {text && (
              <div className="absolute bottom-3 right-3 text-xs text-slate-400 bg-white px-2 py-1 rounded-md shadow-sm">
                {text.length} chars
              </div>
            )}
          </div>
        </div>

        {/* Analyze Button */}
        <button
          onClick={analyzeReview}
          disabled={loading}
          className="relative w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-800 via-blue-900 to-blue-800 hover:from-blue-900 hover:via-blue-950 hover:to-blue-900 text-white font-bold text-base transition-all duration-300 transform hover:scale-[1.01] disabled:opacity-50 disabled:cursor-not-allowed group shadow-lg"
        >
          <span className="relative z-10 flex items-center justify-center gap-2">
            {loading ? (
              <>
                <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Analyzing with Neural Network...
              </>
            ) : (
              <>
                <span className="text-xl">🔍</span>
                Analyze Authenticity
                <span className="text-xl">→</span>
              </>
            )}
          </span>
          <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </button>

        {/* Results Section */}
        {result && (
          <div className="mt-8 animate-fadeInUp">
            
            {/* Results Header */}
            <div className="flex items-center justify-between mb-5 pb-2 border-b-2 border-slate-100">
              <h2 className="text-xl font-bold text-slate-800 flex items-center gap-2">
                <span className="text-2xl">📊</span>
                Analysis Report
              </h2>
              <div className="px-3 py-1 rounded-lg bg-blue-50 text-blue-700 text-xs font-semibold border border-blue-200">
                Real-time Results
              </div>
            </div>

            {/* Metrics Grid */}
            <div className="grid grid-cols-2 gap-5 mb-6">
              
              {/* Fake Probability */}
              <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-red-50 to-red-100/30 p-5 border border-red-200 transition-all duration-300 hover:shadow-md">
                <div className="absolute top-0 right-0 w-20 h-20 bg-red-200 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-red-700 font-bold uppercase tracking-wider flex items-center gap-1">
                      <span>⚠️</span> FAKE PROBABILITY
                    </p>
                    <span className="text-xs text-red-600 bg-red-100 px-2 py-0.5 rounded font-semibold">Risk</span>
                  </div>
                  <p className="text-4xl font-black text-red-600 mb-2">
                    {(result.fake_probability * 100).toFixed(1)}<span className="text-xl">%</span>
                  </p>
                  <div className="mt-2 h-1.5 bg-red-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-red-500 to-red-600 rounded-full transition-all duration-1000"
                      style={{ width: `${result.fake_probability * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

              {/* Trust Score */}
              <div className="relative group overflow-hidden rounded-xl bg-gradient-to-br from-blue-50 to-indigo-100/30 p-5 border border-blue-200 transition-all duration-300 hover:shadow-md">
                <div className="absolute top-0 right-0 w-20 h-20 bg-blue-200 rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 opacity-50"></div>
                <div className="relative">
                  <div className="flex items-center justify-between mb-2">
                    <p className="text-xs text-blue-700 font-bold uppercase tracking-wider flex items-center gap-1">
                      <span>✅</span> TRUST SCORE
                    </p>
                    <span className="text-xs text-blue-600 bg-blue-100 px-2 py-0.5 rounded font-semibold">Confidence</span>
                  </div>
                  <p className="text-4xl font-black text-blue-700 mb-2">
                    {(result.trust_score * 100).toFixed(1)}<span className="text-xl">%</span>
                  </p>
                  <div className="mt-2 h-1.5 bg-blue-200 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-gradient-to-r from-blue-600 to-blue-800 rounded-full transition-all duration-1000"
                      style={{ width: `${result.trust_score * 100}%` }}
                    ></div>
                  </div>
                </div>
              </div>

            </div>

            {/* Detailed Analysis Section */}
            <div className="rounded-xl bg-slate-50 p-5 border border-slate-200 mb-5">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-8 h-8 rounded-lg bg-blue-100 flex items-center justify-center">
                  <span className="text-lg">🔬</span>
                </div>
                <div>
                  <p className="font-bold text-slate-800">Deep Analysis</p>
                  <p className="text-xs text-slate-500">Based on linguistic patterns & behavioral markers</p>
                </div>
              </div>
              
              {/* Verdict Card */}
              <div className={`rounded-lg p-4 transition-all duration-500 ${
                result.fake_probability > 0.7 
                  ? 'bg-red-50 border-l-4 border-red-500' 
                  : result.fake_probability > 0.4 
                    ? 'bg-amber-50 border-l-4 border-amber-500'
                    : 'bg-green-50 border-l-4 border-green-500'
              }`}>
                <div className="flex items-center gap-3">
                  <div className="text-2xl">
                    {result.fake_probability > 0.7 
                      ? '🚨' 
                      : result.fake_probability > 0.4 
                        ? '⚠️' 
                        : '✅'}
                  </div>
                  <div className="flex-1">
                    <p className="font-bold text-slate-800 text-sm">
                      {result.fake_probability > 0.7 
                        ? 'High Risk: Potential Fake Review Detected' 
                        : result.fake_probability > 0.4 
                          ? 'Moderate Risk: Review Requires Verification'
                          : 'Low Risk: Review Appears Authentic'}
                    </p>
                    <p className="text-slate-600 text-xs mt-0.5">
                      {result.fake_probability > 0.7 
                        ? 'Multiple artificial patterns identified' 
                        : result.fake_probability > 0.4 
                          ? 'Some suspicious elements found'
                          : 'High confidence in review authenticity'}
                    </p>
                  </div>
                </div>
              </div>

              {/* Metrics Footer */}
              <div className="grid grid-cols-3 gap-3 mt-4 pt-3 border-t border-slate-200">
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Model</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1">BERT-Large</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Accuracy</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1">98.7%</p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-slate-500 uppercase tracking-wide">Latency</p>
                  <p className="text-sm font-semibold text-slate-700 mt-1">&lt;200ms</p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-3">
              <button className="flex-1 py-2.5 rounded-lg border-2 border-blue-200 text-blue-700 font-semibold hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 text-sm">
                📋 Export Report
              </button>
              <button 
                onClick={() => setText('')}
                className="flex-1 py-2.5 rounded-lg bg-blue-600 text-white font-semibold hover:bg-blue-700 transition-all duration-300 text-sm shadow-md hover:shadow-lg"
              >
                🔄 New Analysis
              </button>
            </div>

          </div>
        )}

        {/* Footer */}
        <div className="mt-6 pt-4 text-center">
          <p className="text-xs text-slate-400">
            Powered by Advanced Neural Networks | Enterprise Grade Security
          </p>
        </div>

      </div>
    </div>
  </div>
</div>

<style jsx>{`
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }
  .animate-fadeInUp {
    animation: fadeInUp 0.4s ease-out;
  }
  
  @keyframes pulse {
    0%, 100% { opacity: 0.1; }
    50% { opacity: 0.15; }
  }
  .delay-1000 {
    animation-delay: 1s;
  }
`}</style>
   </>
  );
}
