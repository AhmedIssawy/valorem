import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login } from '../redux/appSlice';
import axios from 'axios';

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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const validatePassword = (pass) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/;
    return regex.test(pass);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRegister = async () => {
    const { firstName, lastName, nationality, countryCode, phoneNumber, email, username, password } = form;

    if (!firstName || !lastName || !nationality || !phoneNumber || !email || !username || !password) {
      alert('Please fill in all fields.');
      return;
    }

    if (!validatePassword(password)) {
      alert('Password must be at least 8 characters and contain uppercase, lowercase, number and symbol.');
      return;
    }

    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', {
        ...form,
        phone: `${countryCode} ${phoneNumber}`,
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
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '1rem' }}>Register</h2>

      <input
        name="firstName"
        placeholder="First Name"
        value={form.firstName}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="lastName"
        placeholder="Last Name"
        value={form.lastName}
        onChange={handleChange}
        style={inputStyle}
      />

      <select
        name="nationality"
        value={form.nationality}
        onChange={handleChange}
        style={inputStyle}
      >
        <option value="">Select Nationality</option>
        <option value="Egypt">Egypt</option>
        <option value="Saudi Arabia">Saudi Arabia</option>
        <option value="USA">USA</option>
        <option value="Germany">Germany</option>
        <option value="France">France</option>
      </select>

      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <select
          name="countryCode"
          value={form.countryCode}
          onChange={handleChange}
          style={{ ...inputStyle, flex: 1 }}
        >
          <option value="+20">+20 (Egypt)</option>
          <option value="+966">+966 (Saudi Arabia)</option>
          <option value="+1">+1 (USA)</option>
          <option value="+49">+49 (Germany)</option>
          <option value="+33">+33 (France)</option>
        </select>
        <input
          name="phoneNumber"
          placeholder="Phone Number"
          value={form.phoneNumber}
          onChange={handleChange}
          style={{ ...inputStyle, flex: 2 }}
        />
      </div>

      <input
        name="email"
        placeholder="Email"
        type="email"
        value={form.email}
        onChange={handleChange}
        style={inputStyle}
      />
      <input
        name="username"
        placeholder="Username"
        value={form.username}
        onChange={handleChange}
        style={inputStyle}
      />

      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <input
          type={showPassword ? "text" : "password"}
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={handleChange}
          style={{ ...inputStyle, marginBottom: 0, flex: 1 }}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          style={{ marginLeft: '0.5rem' }}
        >
          {showPassword ? "Hide" : "Show"}
        </button>
      </div>

      <button onClick={handleRegister} style={buttonStyle}>Register</button>
    </div>
  );
}

// نفس استايل صفحة اللوجين
const containerStyle = {
  maxWidth: '400px',
  margin: '50px auto',
  padding: '2rem',
  border: '1px solid #ccc',
  borderRadius: '8px',
  backgroundColor: '#f9f9f9',
  boxShadow: '0 0 10px rgba(0,0,0,0.1)',
};

const inputStyle = {
  width: '100%',
  padding: '0.5rem',
  marginBottom: '1rem',
  border: '1px solid #ccc',
  borderRadius: '4px',
};

const buttonStyle = {
  width: '100%',
  padding: '0.75rem',
  backgroundColor: '#28a745',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
  fontWeight: 'bold',
};

export default Register;
