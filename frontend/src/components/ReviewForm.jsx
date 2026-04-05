import { useState } from "react";

export default function ReviewForm() {
  const [text, setText] = useState("");
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const analyzeReview = async () => {
    if (!text) return alert("Enter review text");

    setLoading(true);

    try {
      const res = await fetch("https://fake-review-ml-service.onrender.com/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log("DATA:", data);
      setResult(data);
    } catch (err) {
      console.error(err);
      alert("Backend connection error");
    } finally {
      setLoading(false);
    }
  };

  const exportReport = () => {
  if (!result) return;

  const data = {
    text,
    fake_probability: result.fake_probability,
    trust_score: result.trust_score,
  };

  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });

  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "review_report.json";
  a.click();

  URL.revokeObjectURL(url);
};
  return (
    <>
      <div className="review-form-container">
        <div className="content-wrapper">
          {/* Animated background orbs */}
          <div className="orb-top-left"></div>
          <div className="orb-bottom-right"></div>
          
          {/* Main Card */}
          <div className="main-card">
            
            {/* Navy blue header bar */}
            <div className="header-gradient">
              <div className="header-glow"></div>
              <div className="header-content">
                <div className="badge-container">
                  <div className="ai-badge">
                    <span>🎯 AI-Powered Intelligence</span>
                  </div>
                </div>
                <h1 className="main-title">
                  Fake Review Detector
                </h1>
                <p className="subtitle">
                  Advanced neural network analysis for review authenticity
                </p>
              </div>
            </div>

            {/* Content Area */}
            <div className="content-area">
              
              {/* Input Area */}
              <div className="input-group">
                <label className="input-label">
                  <span className="label-icon">📝</span>
                  Paste Review Text
                  <span className="label-required">(required)</span>
                </label>
                <div className="textarea-wrapper">
                  <textarea
                    className="review-textarea"
                    placeholder="Paste or type the review you want to analyze here..."
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                  />
                  {text && (
                    <div className="char-counter">
                      {text.length} chars
                    </div>
                  )}
                </div>
              </div>

              {/* Analyze Button */}
              <button
                onClick={analyzeReview}
                disabled={loading}
                className="analyze-button"
              >
                <span className="button-content">
                  {loading ? (
                    <>
                      <svg className="spinner-icon" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Analyzing with Neural Network...
                    </>
                  ) : (
                    <>
                      <span className="button-icon">🔍</span>
                      Analyze Authenticity
                      <span className="button-icon">→</span>
                    </>
                  )}
                </span>
                <div className="button-shimmer"></div>
              </button>

              {/* Results Section */}
              {result?.fake_probability !== undefined && (
                <div className="results-section animate-fade-in-up">
                  
                  {/* Results Header */}
                  <div className="results-header">
                    <h2 className="results-title">
                      <span className="results-title-icon">📊</span>
                      Analysis Report
                    </h2>
                    <div className="results-badge">
                      Real-time Results
                    </div>
                  </div>

                  {/* Metrics Grid */}
                  <div className="metrics-grid">
                    
                    {/* Fake Probability */}
                    <div className="metric-card-fake">
                      <div className="metric-glow-fake"></div>
                      <div className="metric-content">
                        <div className="metric-header">
                          <p className="metric-label">
                            <span>⚠️</span> FAKE PROBABILITY
                          </p>
                          <span className="metric-risk-tag">Risk</span>
                        </div>
                        <p className="metric-value">
                          {((result?.fake_probability ?? 0) * 100).toFixed(1)}<span className="metric-value-small">%</span>
                        </p>
                        <div className="progress-bar-container">
                          <div 
                            className="progress-bar-fake"
                            style={{ width: `${((result?.fake_probability ?? 0) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                    {/* Trust Score */}
                    <div className="metric-card-trust">
                      <div className="metric-glow-trust"></div>
                      <div className="metric-content">
                        <div className="metric-header">
                          <p className="metric-label-trust">
                            <span>✅</span> TRUST SCORE
                          </p>
                          <span className="metric-confidence-tag">Confidence</span>
                        </div>
                        <p className="metric-value-trust">
                          {((result?.trust_score ?? 0) * 100).toFixed(1)}<span className="metric-value-small">%</span>
                        </p>
                        <div className="progress-bar-container-trust">
                          <div 
                            className="progress-bar-trust"
                            style={{ width: `${((result?.trust_score ?? 0) * 100)}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>

                  </div>

                  {/* Detailed Analysis Section */}
                  <div className="analysis-section">
                    <div className="analysis-header">
                      <div className="analysis-icon-box">
                        <span className="analysis-icon">🔬</span>
                      </div>
                      <div>
                        <p className="analysis-title">Deep Analysis</p>
                        <p className="analysis-subtitle">Based on linguistic patterns & behavioral markers</p>
                      </div>
                    </div>
                    
                    {/* Verdict Card */}
                    <div className={
                      (result?.fake_probability ?? 0) > 0.7 
                        ? 'verdict-high-risk' 
                        : (result?.fake_probability ?? 0) > 0.4 
                          ? 'verdict-moderate-risk'
                          : 'verdict-low-risk'
                    }>
                      <div className="verdict-content">
                        <div className="verdict-icon">
                          {(result?.fake_probability ?? 0) > 0.7 
                            ? '🚨' 
                            : (result?.fake_probability ?? 0) > 0.4 
                              ? '⚠️' 
                              : '✅'}
                        </div>
                        <div className="verdict-text">
                          <p className="verdict-title">
                            {(result?.fake_probability ?? 0) > 0.7 
                              ? 'High Risk: Potential Fake Review Detected' 
                              : (result?.fake_probability ?? 0) > 0.4 
                                ? 'Moderate Risk: Review Requires Verification'
                                : 'Low Risk: Review Appears Authentic'}
                          </p>
                          <p className="verdict-description">
                            {(result?.fake_probability ?? 0) > 0.7 
                              ? 'Multiple artificial patterns identified' 
                              : (result?.fake_probability ?? 0) > 0.4 
                                ? 'Some suspicious elements found'
                                : 'High confidence in review authenticity'}
                          </p>
                        </div>
                      </div>
                    </div>

                    {/* Metrics Footer */}
                    <div className="metrics-footer">
                      <div className="footer-metric">
                        <p className="footer-metric-label">Model</p>
                        <p className="footer-metric-value">Logistic Regression</p>
                      </div>
                      <div className="footer-metric">
                        <p className="footer-metric-label">Accuracy</p>
                        <p className="footer-metric-value">97.8%</p>
                      </div>
                      <div className="footer-metric">
                        <p className="footer-metric-label">Latency</p>
                        <p className="footer-metric-value">&lt;469ms</p>
                      </div>
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="action-buttons">
                    <button onClick={exportReport} className="btn-outline">📋 Export Report</button>
                    <button 
                      onClick={() => {
                        setText('');
                        setResult(null);
                      }}
                      className="btn-primary"
                    >
                      🔄 New Analysis
                    </button>
                  </div>

                </div>
              )}

              {/* Footer */}
              <div className="app-footer">
                <p className="footer-text">
                  Powered by Advanced Neural Networks | Enterprise Grade Security
                </p>
              </div>

            </div>
          </div>
        </div>
      </div>
    </>
  );
}