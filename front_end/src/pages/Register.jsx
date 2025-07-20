import axios from 'axios';
import { useState } from 'react';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/logo-icon.png';

function Register() {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    nationality: '',
    countryCode: '+20',
    phoneNumber: '',
    email: '',
    username: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  const [errorMessages, setErrorMessages] = useState([]);
  const navigate = useNavigate();

  const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
  });

  const validatePassword = (pass) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pass);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleRegister = async () => {
    const missing = [];
    Object.entries(form).forEach(([k, v]) => !v.trim() && missing.push(k));
    if (missing.length) {
      setErrorMessages([`Please fill: ${missing.join(', ')}`]);
      return;
    }
    if (!validatePassword(form.password)) {
      setErrorMessages([
        'Password must include upper, lower, number & symbol and min 8 chars.',
      ]);
      return;
    }

    setErrorMessages([]);
    setLoading(true);
    try {
      await apiClient.post('/auth/register', {
        name: `${form.firstName} ${form.lastName}`,
        email: form.email,
        password: form.password,
      });
      setSuccessMessage('🎉 Account created! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      setErrorMessages([err.response?.data?.message || 'Registration failed']);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        <img src={logo} alt="logo" style={logoStyle} />
        <h2 style={titleStyle}>Create an Account</h2>

        {successMessage && <div style={successStyle}>{successMessage}</div>}
        {errorMessages.length > 0 && (
          <div style={errorStyle}>
            {errorMessages.map((msg, idx) => (
              <p key={idx} style={{ margin: 0 }}>{msg}</p>
            ))}
          </div>
        )}

        <input
          name="firstName" placeholder="First Name *"
          value={form.firstName} onChange={handleChange} style={inputStyle}
        />
        <input
          name="lastName" placeholder="Last Name *"
          value={form.lastName} onChange={handleChange} style={inputStyle}
        />

        <select name="nationality" value={form.nationality} onChange={handleChange} style={inputStyle}>
          <option value="">Select Nationality *</option>
          {['Egypt','Saudi Arabia','USA','Germany','France'].map(c => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select
            name="countryCode" value={form.countryCode} onChange={handleChange}
            style={{ ...inputStyle, flex: 1 }}
          >
            {['+20','+966','+1','+49','+33'].map(cc => (
              <option key={cc} value={cc}>{cc}</option>
            ))}
          </select>
          <input
            name="phoneNumber" placeholder="Phone Number *"
            value={form.phoneNumber} onChange={handleChange}
            style={{ ...inputStyle, flex: 2 }}
          />
        </div>

        <input
          name="email" placeholder="Email *" type="email"
          value={form.email} onChange={handleChange} style={inputStyle}
        />
        <input
          name="username" placeholder="Username *"
          value={form.username} onChange={handleChange} style={inputStyle}
        />

        <div style={{ position: 'relative', marginBottom: '1rem' }}>
          <input
            type={showPassword ? 'text' : 'password'} name="password"
            placeholder="Password *" value={form.password}
            onChange={handleChange} style={{ ...inputStyle, paddingRight: '.5rem' }}
          />
          <button
            type="button"
            onMouseDown={() => setShowPassword(true)}
            onMouseUp={() => setShowPassword(false)}
            onMouseLeave={() => setShowPassword(false)}
            style={eyeStyle}
          >
            {showPassword ? <FaEyeSlash /> : <FaEye />}
          </button>
        </div>

        <button
          onClick={handleRegister}
          style={{ ...buttonStyle, opacity: loading ? 0.6 : 1 }}
          disabled={loading}
        >
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p style={noteStyle}>* Required fields</p>
      </div>
    </div>
  );
}

// ===== Styles (matches Login) =====

const wrapperStyle = {
  background: 'linear-gradient(135deg, #2c003e, #007bff)', // Deep Violet ➝ Electric Blue
  height: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '1rem',
  fontFamily: 'Nizzoli Rta, sans-serif',
};

const containerStyle = {
  width: '100%',
  maxWidth: '420px',
  background: 'linear-gradient(135deg, #ffffffcc, #e0e0ffcc)',
  borderRadius: '16px',
  padding: '2rem',
  boxShadow: '0 10px 30px rgba(0,0,0,0.15)',
  textAlign: 'center',
  fontFamily: 'Aktiv Grotesk, sans-serif',
  backdropFilter: 'blur(8px)',
  border: '1px solid rgba(255,255,255,0.2)',
};

const logoStyle = { width: '80px', marginBottom: '1rem' };
const titleStyle = {
  marginBottom: '1.5rem',
  fontSize: '1.5rem',
  color: '#1752c9ff',
  fontFamily: 'Nizzoli Rta, sans-serif',
};

const inputStyle = {
  width: '95%',
  padding: '0.6rem',
  marginBottom: '0.9rem',
  borderRadius: '6px',
  border: '1px solid #A8FFDA',
  backgroundColor: '#fff',
  fontSize: '0.95rem',
};


const eyeStyle = {
  position: 'absolute',
  right: '10px',
  top: '50%',
  transform: 'translateY(-50%)',
  background: 'transparent',
  border: 'none',
  cursor: 'pointer',
  color: '#007bff',
  fontSize: '1.2rem',
};

const buttonStyle = {
  width: '100%',
  padding: '0.65rem',
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '8px',
  fontWeight: 'bold',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: 'transform 0.3s ease, background-color 0.3s ease',
};

const activeButtonStyle = {
  backgroundColor: '#6bef6bff', // أخضر فاتح عند الضغط
};


const successStyle = {
  padding: '1rem',
  backgroundColor: '#e0f7ec',
  color: '#056644',
  borderRadius: '8px',
  marginBottom: '1rem',
};

const errorStyle = {
  padding: '1rem',
  backgroundColor: '#fdecea',
  color: '#c62828',
  borderRadius: '8px',
  marginBottom: '1rem',
  textAlign: 'left',
};

const noteStyle = { marginTop: '1rem', fontSize: '0.9rem', color: '#777' };

export default Register;
