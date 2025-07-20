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
        <img src={logo} alt="Valorem Logo" style={logoStyle} />
        <h2 style={titleStyle}>Welcome Back</h2>

        <form onSubmit={handleLogin}>
          {error && <div style={errorStyle}>{error}</div>}

          <div style={fieldStyle}>
            <label style={labelStyle}>Email</label>
            <div style={inputRowStyle}>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                style={inputBoxStyle}
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
                required
              />
              <button
                type="button"
                onMouseDown={() => setShowPassword(true)}
                onMouseUp={() => setShowPassword(false)}
                onMouseLeave={() => setShowPassword(false)}
                style={eyeButtonStyle}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            style={{
              ...(loading ? { ...buttonStyle, ...disabledButtonStyle } : buttonStyle),
              ...(hovered && !loading ? buttonHoverStyle : {}),
            }}
            disabled={loading}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {loading ? 'Logging in...' : 'Login'}
          </button>
        </form>
      </div>
    </div>
  );
}

// ====== STYLES ======

const wrapperStyle = {
  background: 'linear-gradient(135deg, #7F00FF, #E100FF)',
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
};

const containerStyle = {
  backgroundColor: '#fff',
  padding: '2rem',
  borderRadius: '16px',
  width: '100%',
  maxWidth: '400px',
  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  textAlign: 'center',
};

const logoStyle = {
  width: '80px',
  marginBottom: '1rem',
};

const titleStyle = {
  marginBottom: '1.5rem',
  fontSize: '1.5rem',
  fontWeight: '600',
  color: '#6a11cb',
};

const fieldStyle = {
  marginBottom: '1.25rem',
  textAlign: 'left',
};

const labelStyle = {
  display: 'block',
  marginBottom: '0.5rem',
  fontWeight: '500',
  color: '#333',
};

const inputRowStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const inputBoxStyle = {
  width: '100%',
  padding: '0.75rem',
  borderRadius: '8px',
  border: '1px solid #ccc',
  fontSize: '1rem',
  outline: 'none',
};

const passwordContainerStyle = {
  position: 'relative',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
};

const passwordInputStyle = {
  ...inputBoxStyle,
  width: '100%',
  paddingRight: '2.5rem',
};

const eyeButtonStyle = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  backgroundColor: 'transparent',
  border: 'none',
  color: '#6a11cb',
  cursor: 'pointer',
  fontSize: '1.2rem',
  display: 'flex',
  alignItems: 'center',
  padding: 0,
};

const buttonStyle = {
  width: '70%',
  margin: '1rem auto 0',
  padding: '0.75rem',
  backgroundColor: '#7F00FF',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, background-color 0.3s ease',
  display: 'block',
};

const buttonHoverStyle = {
  transform: 'scale(1.05)',
  backgroundColor: '#9b00ff',
};

const disabledButtonStyle = {
  backgroundColor: '#aaa',
  cursor: 'not-allowed',
};

const errorStyle = {
  backgroundColor: '#f8d7da',
  color: '#721c24',
  padding: '0.75rem',
  borderRadius: '8px',
  marginBottom: '1rem',
  border: '1px solid #f5c6cb',
  textAlign: 'left',
};

export default Login;
