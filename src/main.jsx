import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { ThemeProvider } from './context/ThemeContext.jsx';
import { StudentProvider } from './context/StudentContext.jsx';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  handleReset = () => {
    try {
      localStorage.clear();
      window.location.reload();
    } catch {
      window.location.reload();
    }
  };

  render() {
    if (this.state.hasError) {
      return (
        <div style={{ minHeight: '100vh', background: '#060913', color: '#f8fafc', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '24px', fontFamily: 'sans-serif' }}>
          <div style={{ maxWidth: '480px', width: '100%', background: '#0f172a', border: '1px solid #334155', borderRadius: '16px', padding: '32px', textAlign: 'center', boxShadow: '0 20px 40px rgba(0,0,0,0.5)' }}>
            <div style={{ fontSize: '36px', marginBottom: '16px' }}>🎓</div>
            <h2 style={{ fontSize: '20px', fontWeight: 'bold', marginBottom: '8px', color: '#38bdf8' }}>Autonomous College Student ERP</h2>
            <p style={{ fontSize: '13px', color: '#94a3b8', marginBottom: '20px', lineHeight: 1.6 }}>
              A temporary display glitch was detected. Click below to refresh your academic dashboard with fresh default data.
            </p>
            <button
              onClick={this.handleReset}
              style={{ background: '#0284c7', color: '#ffffff', fontWeight: 'bold', fontSize: '13px', padding: '10px 20px', borderRadius: '10px', border: 'none', cursor: 'pointer' }}
            >
              Reset Cache & Reload Dashboard
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <StudentProvider>
          <App />
        </StudentProvider>
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);
