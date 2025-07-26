import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/appSlice';
import logo from '../assets/logo-icon.png';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
  });

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    if (!email || !password) {
      setError('Please enter both email and password.');
      setLoading(false);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format.');
      setLoading(false);
      return;
    }

    try {
      const res = await apiClient.post('/auth/login', {
        email: email.trim(),
        password,
      });

      if (res.data.success) {
        const user = res.data.data;
        dispatch(login(user));
        navigate(user.role === 'admin' ? '/admin' : '/');
      }
    } catch (err) {
      const message = err.response?.data?.message || 'Login failed. Please try again.';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        {/* Logo Section */}
        <div style={logoContainerStyle}>
          <img src={logo} alt="Valorem Logo" style={logoStyle} />
          <div style={brandTextStyle}>Valorem</div>
        </div>
        
        <h2 style={titleStyle}>Welcome Back</h2>
        <p style={subtitleStyle}>Sign in to continue to your account</p>

        <form onSubmit={handleLogin} style={formStyle}>
          {error && (
            <div style={errorStyle}>
              <div style={errorIconStyle}>⚠️</div>
              {error}
            </div>
          )}

          <div style={fieldStyle}>
            <label style={labelStyle}>Email Address</label>
            <div style={inputContainerStyle}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputStyle}
                placeholder="Enter your email"
                required
              />
            </div>
          </div>

          <div style={fieldStyle}>
            <label style={labelStyle}>Password</label>
            <div style={passwordContainerStyle}>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={passwordInputStyle}
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                style={eyeButtonStyle}
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              ...buttonStyle,
              ...(loading ? disabledButtonStyle : {}),
              ...(hovered && !loading ? buttonHoverStyle : {}),
            }}
            disabled={loading}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {loading ? (
              <div style={loadingContentStyle}>
                <span style={spinnerStyle}>⟳</span>
                Signing in...
              </div>
            ) : (
              'Sign In'
            )}
          </button>
        </form>

        {/* Footer */}
        <div style={footerStyle}>
          <span style={footerTextStyle}>Powered by Valorem 2025</span>
        </div>
      </div>
    </div>
  );
}

// ====== BRAND COLORS ======
const colors = {
  deepViolet: '#4c1d95',
  deepViolentLight: '#7c3aed',
  deepViolentDark: '#3730a3',
  neoMint: '#10b981',
  neoMintLight: '#34d399',
  electricBlue: '#3b82f6',
  electricBlueLight: '#60a5fa',
  charcoalGray: '#374151',
  charcoalGrayLight: '#6b7280',
  brightCyan: '#06b6d4',
  brightCyanLight: '#22d3ee',
  white: '#ffffff',
  background: '#f8fafc',
  error: '#ef4444',
  errorBg: '#fef2f2',
  success: '#10b981',
};

// ====== STYLES ======
const wrapperStyle = {
  background: `linear-gradient(135deg, ${colors.deepViolet} 0%, ${colors.electricBlue} 50%, ${colors.neoMint} 100%)`,
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  position: 'relative',
  overflow: 'hidden',
};

const containerStyle = {
  background: 'rgba(255, 255, 255, 0.95)',
  padding: '3rem 2.5rem',
  borderRadius: '20px',
  width: '100%',
  maxWidth: '440px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  textAlign: 'center',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  position: 'relative',
  transform: 'translateY(0)',
  transition: 'all 0.3s ease',
};

const logoContainerStyle = {
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  marginBottom: '2rem',
};

const logoStyle = {
  width: '64px',
  height: '64px',
  marginBottom: '0.75rem',
  filter: 'drop-shadow(0 4px 8px rgba(76, 29, 149, 0.2))',
};

const brandTextStyle = {
  fontFamily: "'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif",
  fontSize: '1.5rem',
  fontWeight: '700',
  color: colors.deepViolet,
  letterSpacing: '0.05em',
};

const titleStyle = {
  marginBottom: '0.5rem',
  fontSize: '2rem',
  fontWeight: '700',
  color: colors.deepViolet,
  fontFamily: "'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif",
  letterSpacing: '-0.025em',
  lineHeight: '1.2',
};

const subtitleStyle = {
  marginBottom: '2rem',
  fontSize: '1rem',
  fontWeight: '400',
  color: colors.charcoalGrayLight,
  lineHeight: '1.5',
};

const formStyle = {
  textAlign: 'left',
};

const fieldStyle = {
  marginBottom: '1.5rem',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.75rem',
  fontWeight: '500',
  color: colors.charcoalGray,
  fontSize: '0.875rem',
  letterSpacing: '0.01em',
};

const inputContainerStyle = {
  position: 'relative',
};

const inputStyle = {
  width: '100%',
  padding: '1rem 1.25rem',
  borderRadius: '12px',
  border: `2px solid ${colors.background}`,
  fontSize: '1rem',
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
  outline: 'none',
  backgroundColor: colors.white,
  color: colors.charcoalGray,
  transition: 'all 0.2s ease',
  boxSizing: 'border-box',
  '::placeholder': {
    color: colors.charcoalGrayLight,
  },
  ':focus': {
    borderColor: colors.electricBlue,
    boxShadow: `0 0 0 4px ${colors.electricBlueLight}33`,
  },
};

const passwordContainerStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
};

const passwordInputStyle = {
  ...inputStyle,
  paddingRight: '3rem',
};

const eyeButtonStyle = {
  position: 'absolute',
  right: '1rem',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'transparent',
  border: 'none',
  color: colors.charcoalGrayLight,
  cursor: 'pointer',
  fontSize: '1.1rem',
  display: 'flex',
  alignItems: 'center',
  padding: '0.5rem',
  borderRadius: '6px',
  transition: 'color 0.2s ease',
  ':hover': {
    color: colors.electricBlue,
  },
};

const buttonStyle = {
  width: '100%',
  margin: '2rem 0 1.5rem',
  padding: '1rem 2rem',
  backgroundColor: colors.deepViolet,
  color: colors.white,
  border: 'none',
  borderRadius: '12px',
  fontWeight: '600',
  fontSize: '1rem',
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
  cursor: 'pointer',
  transition: 'all 0.2s ease',
  boxShadow: `0 4px 12px ${colors.deepViolet}40`,
  letterSpacing: '0.01em',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '52px',
};

const buttonHoverStyle = {
  backgroundColor: colors.deepViolentLight,
  transform: 'translateY(-1px)',
  boxShadow: `0 6px 20px ${colors.deepViolet}50`,
};

const disabledButtonStyle = {
  backgroundColor: colors.charcoalGrayLight,
  cursor: 'not-allowed',
  transform: 'none',
  boxShadow: 'none',
};

const loadingContentStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  gap: '0.5rem',
};

const spinnerStyle = {
  display: 'inline-block',
  animation: 'spin 1s linear infinite',
  fontSize: '1.2rem',
};

const errorStyle = {
  backgroundColor: colors.errorBg,
  color: colors.error,
  padding: '1rem 1.25rem',
  borderRadius: '12px',
  marginBottom: '1.5rem',
  border: `1px solid ${colors.error}20`,
  textAlign: 'left',
  fontSize: '0.875rem',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
};

const errorIconStyle = {
  fontSize: '1rem',
  flexShrink: 0,
};

const footerStyle = {
  marginTop: '2rem',
  paddingTop: '1.5rem',
  borderTop: `1px solid ${colors.background}`,
  textAlign: 'center',
};

const footerTextStyle = {
  fontSize: '0.75rem',
  color: colors.charcoalGrayLight,
  fontWeight: '400',
  letterSpacing: '0.025em',
};

// CSS Animation for spinner
const styleSheet = document.createElement('style');
styleSheet.type = 'text/css';
styleSheet.innerText = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
  
  input:focus {
    border-color: ${colors.electricBlue} !important;
    box-shadow: 0 0 0 4px ${colors.electricBlueLight}33 !important;
  }
  
  input::placeholder {
    color: ${colors.charcoalGrayLight} !important;
  }
  
  button:hover .eye-icon {
    color: ${colors.electricBlue} !important;
  }
  
  @media (max-width: 768px) {
    .login-container {
      padding: 2rem 1.5rem !important;
      margin: 1rem !important;
    }
    
    .login-title {
      font-size: 1.5rem !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Login;