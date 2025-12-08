import { useState } from 'react';

function HeadersChecker() {
  const [headers, setHeaders] = useState(null);
  const [checking, setChecking] = useState(false);

  const checkHeaders = async () => {
    setChecking(true);
    try {
      // Fetch current page to see headers
      const response = await fetch(window.location.href);

      // Note: Not all headers are accessible from JavaScript for security reasons
      // This is just a basic check
      const headersList = {
        'content-security-policy': response.headers.get('content-security-policy'),
        'x-frame-options': response.headers.get('x-frame-options'),
        'strict-transport-security': response.headers.get('strict-transport-security'),
        'x-content-type-options': response.headers.get('x-content-type-options'),
        'referrer-policy': response.headers.get('referrer-policy'),
        'permissions-policy': response.headers.get('permissions-policy')
      };

      setHeaders(headersList);
    } catch (error) {
      console.error('Error checking headers:', error);
    } finally {
      setChecking(false);
    }
  };

  const requiredHeaders = [
    { name: 'content-security-policy', label: 'Content-Security-Policy', critical: true },
    { name: 'x-frame-options', label: 'X-Frame-Options', critical: true },
    { name: 'strict-transport-security', label: 'Strict-Transport-Security', critical: false },
    { name: 'x-content-type-options', label: 'X-Content-Type-Options', critical: true },
    { name: 'referrer-policy', label: 'Referrer-Policy', critical: false },
    { name: 'permissions-policy', label: 'Permissions-Policy', critical: false }
  ];

  return (
    <div className="card">
      <h2>Security Headers Check</h2>

      <button
        className="test-button"
        onClick={checkHeaders}
        disabled={checking}
      >
        {checking ? 'Checking...' : 'Check Headers'}
      </button>

      <div className="info-box" style={{ marginTop: '15px' }}>
        <strong>💡 Tip:</strong> Use DevTools → Network tab → Click any request → Headers → Response Headers
        to see ALL headers (JavaScript can only see some headers)
      </div>

      {headers && (
        <div className="missing-headers">
          <h3>Missing Security Headers:</h3>
          <ul className="header-list">
            {requiredHeaders.map(header => {
              const isPresent = !!headers[header.name];
              return (
                <li key={header.name} className={isPresent ? 'present' : ''}>
                  <strong>{header.label}:</strong>{' '}
                  {isPresent ? (
                    <>
                      ✅ Present
                      {header.critical && <span style={{ marginLeft: '10px', color: '#155724' }}>(Critical)</span>}
                    </>
                  ) : (
                    <>
                      ❌ Missing
                      {header.critical && <span style={{ marginLeft: '10px', color: '#721c24' }}>(Critical!)</span>}
                    </>
                  )}
                </li>
              );
            })}
          </ul>
        </div>
      )}

      {headers && (
        <div className="result-box">
          <strong>Headers detected via JavaScript:</strong>
          <pre>{JSON.stringify(headers, null, 2)}</pre>
        </div>
      )}
    </div>
  );
}

export default HeadersChecker;

