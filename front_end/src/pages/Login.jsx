import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../redux/appSlice';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // لو حابب تسيبه للتسجيل فقط، تمام
// أو تقدر تستخدم axiosWithToken على طول

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
    if (!email || !password) {
      setError('Please enter both email and password.');
      return;
    }

    if (!/\S+@\S+\.\S+/.test(email)) {
      setError('Invalid email format.');
      return;
    }
    

    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password,
      });

      const { token, user } = res.data;

      // ✅ خزّن التوكن
      localStorage.setItem('token', token);

      // ✅ خزّن بيانات المستخدم
      localStorage.setItem('user', JSON.stringify(user));
      dispatch(login(user)); // من الأفضل يكون في redux reducer

      // ✅ توجيه حسب الرول
      if (user.role === 'admin') {
        navigate('/admin');
      } else {
        navigate('/');
      }
    } catch (err) {
      console.error('Login failed:', err);
      setError('Email or password is incorrect.');
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ marginBottom: '1rem' }}>Login</h2>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <label>Email</label>
      <input
        type="email"
        value={email}
        placeholder="Enter your email"
        onChange={(e) => setEmail(e.target.value)}
        style={inputStyle}
      />

      <label>Password</label>
      <div style={{ display: 'flex', alignItems: 'center', marginBottom: '1rem' }}>
        <input
          type={showPassword ? "text" : "password"}
          value={password}
          placeholder="Enter your password"
          onChange={(e) => setPassword(e.target.value)}
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

      <button onClick={handleLogin} style={buttonStyle}>Login</button>
    </div>
  );
}

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
  backgroundColor: '#007bff',
  color: '#fff',
  border: 'none',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Login;