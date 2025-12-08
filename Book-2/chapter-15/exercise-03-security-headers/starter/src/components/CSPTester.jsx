import { useState } from 'react';

function CSPTester() {
  const [violations, setViolations] = useState([]);

  // Listen for CSP violations
  useState(() => {
    const handleViolation = (e) => {
      setViolations(prev => [...prev, {
        timestamp: new Date().toISOString(),
        blockedURI: e.blockedURI,
        violatedDirective: e.violatedDirective,
        effectiveDirective: e.effectiveDirective,
        sourceFile: e.sourceFile,
        lineNumber: e.lineNumber
      }]);
    };

    document.addEventListener('securitypolicyviolation', handleViolation);

    return () => {
      document.removeEventListener('securitypolicyviolation', handleViolation);
    };
  }, []);

  const testInlineScript = () => {
    try {
      // This will be blocked by CSP if configured
      const script = document.createElement('script');
      script.textContent = 'alert("Inline script executed!")';
      document.body.appendChild(script);
    } catch (error) {
      console.log('Inline script blocked:', error);
    }
  };

  const testExternalImage = () => {
    const img = document.createElement('img');
    img.src = 'https://via.placeholder.com/150';
    img.alt = 'Test image';
    document.body.appendChild(img);

    // Show result
    setTimeout(() => {
      if (img.complete) {
        alert('External image loaded successfully');
      } else {
        alert('External image was blocked by CSP');
      }
      img.remove();
    }, 1000);
  };

  const testEval = () => {
    try {
      // eslint-disable-next-line no-eval
      eval('console.log("Eval executed!")');
      alert('⚠️ eval() was allowed! CSP should block this.');
    } catch (error) {
      alert('✅ eval() was blocked by CSP');
    }
  };

  const clearViolations = () => {
    setViolations([]);
  };

  return (
    <div className="test-section">
      <h3>CSP Test Suite</h3>

      <p style={{ marginBottom: '15px', color: '#666' }}>
        Test if Content Security Policy is working correctly:
      </p>

      <button className="test-button danger" onClick={testInlineScript}>
        Test Inline Script
      </button>

      <button className="test-button" onClick={testExternalImage}>
        Test External Image
      </button>

      <button className="test-button danger" onClick={testEval}>
        Test eval()
      </button>

      <div className="info-box" style={{ marginTop: '20px' }}>
        <strong>Expected Results (with CSP):</strong>
        <ul style={{ marginLeft: '20px', marginTop: '10px' }}>
          <li>Inline scripts should be blocked</li>
          <li>eval() should be blocked</li>
          <li>External images from HTTPS should be allowed (if configured)</li>
          <li>All violations should appear in console and below</li>
        </ul>
      </div>

      {violations.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <h4>CSP Violations Detected: {violations.length}</h4>
            <button
              className="test-button"
              style={{ padding: '6px 12px', fontSize: '12px' }}
              onClick={clearViolations}
            >
              Clear
            </button>
          </div>

          {violations.map((v, index) => (
            <div key={index} className="result-box" style={{ marginBottom: '10px' }}>
              <strong>Violation #{index + 1}</strong>
              <pre style={{ marginTop: '5px', fontSize: '11px' }}>
                {JSON.stringify(v, null, 2)}
              </pre>
            </div>
          ))}
        </div>
      )}

      {violations.length === 0 && (
        <div className="result-box" style={{ marginTop: '20px', background: '#fff3cd' }}>
          <strong>⚠️ No CSP violations detected yet</strong>
          <p style={{ marginTop: '5px' }}>
            This likely means CSP is NOT configured. Once you add CSP headers,
            the test buttons above will trigger violations.
          </p>
        </div>
      )}
    </div>
  );
}

export default CSPTester;

