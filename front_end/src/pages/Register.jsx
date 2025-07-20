import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
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

  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pass);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const missingFields = [];

    if (!form.firstName.trim()) missingFields.push('First Name');
    if (!form.lastName.trim()) missingFields.push('Last Name');
    if (!form.nationality.trim()) missingFields.push('Nationality');
    if (!form.countryCode.trim()) missingFields.push('Country Code');
    if (!form.phoneNumber.trim()) missingFields.push('Phone Number');
    if (!form.email.trim()) missingFields.push('Email');
    if (!form.username.trim()) missingFields.push('Username');
    if (!form.password.trim()) missingFields.push('Password');

    if (missingFields.length > 0) {
      setErrorMessages([`Please fill in the following fields: ${missingFields.join(', ')}`]);
      return;
    }

    if (!validatePassword(form.password)) {
      setErrorMessages([
        'Password must be at least 8 characters and include uppercase, lowercase, number, and a symbol.',
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

      setSuccessMessage('🎉 Account created successfully. Redirecting to login...');
      setTimeout(() => navigate('/login'), 2000);
    } catch (err) {
      const msg = err.response?.data?.message || 'Registration failed';
      setErrorMessages([msg]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={pageWrapper}>
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

        <input name="firstName" placeholder="First Name *" value={form.firstName} onChange={handleChange} style={inputStyle} />
        <input name="lastName" placeholder="Last Name *" value={form.lastName} onChange={handleChange} style={inputStyle} />

        <select name="nationality" value={form.nationality} onChange={handleChange} style={inputStyle}>
          <option value="">Select Nationality *</option>
          <option value="Egypt">Egypt</option>
          <option value="Saudi Arabia">Saudi Arabia</option>
          <option value="USA">USA</option>
          <option value="Germany">Germany</option>
          <option value="France">France</option>
        </select>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <select name="countryCode" value={form.countryCode} onChange={handleChange} style={{ ...inputStyle, flex: 1 }}>
            <option value="+20">+20 (Egypt)</option>
            <option value="+966">+966 (Saudi Arabia)</option>
            <option value="+1">+1 (USA)</option>
            <option value="+49">+49 (Germany)</option>
            <option value="+33">+33 (France)</option>
          </select>
          <input name="phoneNumber" placeholder="Phone Number *" value={form.phoneNumber} onChange={handleChange} style={{ ...inputStyle, flex: 2 }} />
        </div>

        <input name="email" placeholder="Email *" type="email" value={form.email} onChange={handleChange} style={inputStyle} />
        <input name="username" placeholder="Username *" value={form.username} onChange={handleChange} style={inputStyle} />

        <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password *"
            value={form.password}
            onChange={handleChange}
            style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
          />
          <button type="button" onClick={() => setShowPassword(!showPassword)} style={toggleButtonStyle}>
            {showPassword ? 'Hide' : 'Show'}
          </button>
        </div>

        <button onClick={handleRegister} style={{ ...buttonStyle, opacity: loading ? 0.6 : 1 }} disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>

        <p style={{ marginTop: '1rem', textAlign: 'center', fontSize: '0.9rem', color: '#777' }}>
          * Required fields
        </p>
      </div>
    </div>
  );
}

// ========== Styles ==========

const pageWrapper = {
  background: 'linear-gradient(135deg, #5f0f99, #9c27b0)',
  minHeight: '100vh',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
};

const containerStyle = {
  width: '100%',
  maxWidth: '450px',
  backgroundColor: '#fff',
  borderRadius: '16px',
  padding: '2rem',
  boxShadow: '0 8px 30px rgba(0,0,0,0.15)',
  textAlign: 'center',
};

const logoStyle = {
  width: '60px',
  height: '60px',
  marginBottom: '1rem',
};

const titleStyle = {
  marginBottom: '1rem',
  color: '#5f0f99',
};

const inputStyle = {
  width: '100%',
  padding: '0.75rem',
  marginBottom: '1rem',
  borderRadius: '6px',
  border: '1px solid #ccc',
  fontSize: '1rem',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#5f0f99',
  color: '#fff',
  fontWeight: 'bold',
  border: 'none',
  borderRadius: '6px',
  fontSize: '1rem',
  cursor: 'pointer',
};

const toggleButtonStyle = {
  marginLeft: '0.5rem',
  background: 'none',
  border: 'none',
  color: '#5f0f99',
  fontWeight: 'bold',
  cursor: 'pointer',
};

const successStyle = {
  padding: '1rem',
  backgroundColor: '#e0f7ec',
  color: '#056644',
  border: '1px solid #a5d6a7',
  borderRadius: '6px',
  marginBottom: '1rem',
};

const errorStyle = {
  padding: '1rem',
  backgroundColor: '#fdecea',
  color: '#c62828',
  border: '1px solid #f5c6cb',
  borderRadius: '6px',
  marginBottom: '1rem',
};

export default Register;
