import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/appSlice';
import axios from 'axios';

function Register() {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [nationality, setNationality] = useState('');
  const [countryCode, setCountryCode] = useState('+20');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [email, setEmail] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pass);
  };

  const handleRegister = async () => {
    if (!firstName || !lastName || !nationality || !phoneNumber || !email || !username || !password) {
      alert('Please fill in all fields.');
      return;
    }

    if (!validatePassword(password)) {
      alert('Password must contain uppercase, lowercase, numbers, symbols, and be at least 8 characters.');
      return;
    }

    const fullPhone = `${countryCode} ${phoneNumber}`;

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        firstName,
        lastName,
        nationality,
        phone: fullPhone,
        email,
        username,
        password,
      });

      const { token, user } = res.data;

      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(login(user));

      navigate('/');
    } catch (err) {
      console.error('Registration failed:', err);
      alert(err.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div style={{ padding: '2rem', maxWidth: '400px', margin: '0 auto' }}>
      <h2>Register</h2>

      <label>First Name</label>
      <input type="text" value={firstName} onChange={(e) => setFirstName(e.target.value)} style={inputStyle} />

      <label>Last Name</label>
      <input type="text" value={lastName} onChange={(e) => setLastName(e.target.value)} style={inputStyle} />

      <label>Nationality</label>
      <select value={nationality} onChange={(e) => setNationality(e.target.value)} style={inputStyle}>
        <option value="">Select Nationality</option>
        <option value="Egypt">Egypt</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="United States">United States</option>
        <option value="Germany">Germany</option>
        <option value="France">France</option>
        <option value="India">India</option>
      </select>

      <label>Phone Number</label>
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1rem' }}>
        <select value={countryCode} onChange={(e) => setCountryCode(e.target.value)} style={{ padding: '0.5rem' }}>
          <option value="+20">+20 (Egypt)</option>
          <option value="+966">+966 (Saudi Arabia)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+49">+49 (Germany)</option>
          <option value="+33">+33 (France)</option>
          <option value="+91">+91 (India)</option>
        </select>
        <input
          type="text"
          placeholder="Phone Number"
          value={phoneNumber}
          onChange={(e) => setPhoneNumber(e.target.value)}
          style={{ flex: 1, padding: '0.5rem' }}
        />
      </div>

      <label>Email</label>
      <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} style={inputStyle} />

      <label>Username</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} style={inputStyle} />

      <label>Password</label>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
        />
        <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ marginLeft: '0.5rem' }}>
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button onClick={handleRegister} style={buttonStyle}>Register</button>
    </div>
  );
}

const inputStyle = {
  display: 'block',
  marginBottom: '1rem',
  padding: '0.5rem',
  width: '100%',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Register;
