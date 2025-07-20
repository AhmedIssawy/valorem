import { useContext, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext';
import { logout } from '../redux/appSlice';
import axios from 'axios';
import logoFull from '../assets/logo-full.png';

function Navbar() {
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { lang, text, toggleLang } = useContext(LanguageContext);

  const [hovered, setHovered] = useState(null);
  const [logoutHovered, setLogoutHovered] = useState(false);

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/auth/logout', {}, {
        withCredentials: true,
      });
      dispatch(logout());
      navigate('/login');
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <nav style={navbarStyle} className="navbar-animated">
      <img
        src={logoFull}
        alt="Valorem Logo"
        style={{ ...logoImageStyle, cursor: 'pointer' }}
        onClick={() => navigate('/')}
      />

      <ul style={navLinksStyle}>
        {['home', 'about', 'courses', 'community'].map((item, index) => (
          <li key={item}>
            <Link
              to={`/${item === 'home' ? '' : item}`}
              style={hovered === index ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
              onMouseEnter={() => setHovered(index)}
              onMouseLeave={() => setHovered(null)}
            >
              {text[item]}
            </Link>
          </li>
        ))}

        {user?.role === 'admin' && (
          <li>
            <Link
              to="/admin"
              style={hovered === 'admin' ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
              onMouseEnter={() => setHovered('admin')}
              onMouseLeave={() => setHovered(null)}
            >
              {text.admin}
            </Link>
          </li>
        )}

        {!user ? (
          <>
            <li>
              <Link
                to="/login"
                style={hovered === 'login' ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
                onMouseEnter={() => setHovered('login')}
                onMouseLeave={() => setHovered(null)}
              >
                {text.login}
              </Link>
            </li>
            <li>
              <Link
                to="/register"
                style={hovered === 'register' ? { ...linkStyle, ...linkHoverStyle } : linkStyle}
                onMouseEnter={() => setHovered('register')}
                onMouseLeave={() => setHovered(null)}
              >
                {text.register}
              </Link>
            </li>
          </>
        ) : (
          <>
            <li style={userInfoStyle}>{user.firstName} {user.lastName}</li>
            <li>
              <button
                onClick={handleLogout}
                style={{
                  ...logoutBtnStyle,
                  ...(logoutHovered ? logoutBtnHoverStyle : {}),
                }}
                onMouseEnter={() => setLogoutHovered(true)}
                onMouseLeave={() => setLogoutHovered(false)}
              >
                <span style={{ marginRight: '6px' }}>🚪</span>{text.logout}
              </button>
            </li>
          </>
        )}

        <li>
          <button onClick={toggleLang} style={langBtnStyle}>
            🌐 {lang === 'ar' ? 'English' : 'عربي'}
          </button>
        </li>
      </ul>
    </nav>
  );
}

// ✅ التنسيقات
const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: 'linear-gradient(90deg, #0f0f1c, #1a1a2e)', // الأسود المائل للكحلي
  padding: '1rem 2rem',
  boxShadow: '0 2px 12px rgba(0, 0, 0, 0.2)',
};


const logoImageStyle = {
  height: '45px',
  objectFit: 'contain',
};

const navLinksStyle = {
  display: 'flex',
  gap: '1.5rem',
  listStyle: 'none',
  alignItems: 'center',
  margin: 0,
  padding: 0,
};

const linkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '1.05rem',
  fontWeight: 600,
  transition: 'all 0.3s ease',
};

const linkHoverStyle = {
  fontSize: '1.15rem',
  color: '#00eaff', // لبني (Electric Blue)
};

const userInfoStyle = {
  color: '#b0ffb0',
  fontWeight: '600',
  fontSize: '1rem',
};

const logoutBtnStyle = {
  backgroundColor: '#00eaff',          // Bright Cyan
  color: '#4b0082',                    // Deep Violet
  border: '2px solid #4b0082',
  padding: '0.4rem 0.9rem',
  borderRadius: '20px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontSize: '0.95rem',
};

const logoutBtnHoverStyle = {
  backgroundColor: '#4b0082',
  color: '#fff',
};

const langBtnStyle = {
  backgroundColor: '#fff',
  color: '#4b0082',
  border: 'none',
  padding: '0.3rem 0.8rem',
  borderRadius: '20px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background-color 0.3s ease',
};

export default Navbar;
