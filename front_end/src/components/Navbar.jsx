import { useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { LanguageContext } from '../LanguageContext';
import { logout } from '../redux/appSlice';

function Navbar() {
  const user = useSelector((state) => state.app.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { lang, text, toggleLang } = useContext(LanguageContext);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <nav style={navbarStyle} className="navbar-animated">
      <div>
        <Link to="/" style={logoStyle}>Valorem</Link>
      </div>

      <ul style={navLinksStyle}>
        <li><Link to="/" style={linkStyle}>{text.home}</Link></li>
        <li><Link to="/about" style={linkStyle}>{text.about}</Link></li>
        <li><Link to="/courses" style={linkStyle}>{text.courses}</Link></li>
        <li><Link to="/community" style={linkStyle}>{text.community}</Link></li>

        {/* رابط واحد للإدمن فقط */}
        {user?.role === 'admin' && (
          <li><Link to="/admin" style={linkStyle}>{text.admin}</Link></li>
        )}

        {/* روابط الدخول أو بيانات المستخدم */}
        {!user ? (
          <>
            <li><Link to="/login" style={linkStyle}>{text.login}</Link></li>
            <li><Link to="/register" style={linkStyle}>{text.register}</Link></li>
          </>
        ) : (
          <>
            <li style={userInfoStyle}>{user.firstName} {user.lastName}</li>
            <li>
              <button onClick={handleLogout} style={logoutBtnStyle}>{text.logout}</button>
            </li>
          </>
        )}

        {/* زر تغيير اللغة */}
        <li>
          <button onClick={toggleLang} style={langBtnStyle}>
            {lang === 'ar' ? 'English' : 'عربي'}
          </button>
        </li>
      </ul>
    </nav>
  );
}

const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#1e1e2f',
  padding: '1rem 2rem',
  boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
};

const logoStyle = {
  fontSize: '1.8rem',
  fontWeight: 'bold',
  color: '#00d1b2',
  textDecoration: 'none',
  fontFamily: 'Poppins, sans-serif',
  letterSpacing: '1px',
};

const navLinksStyle = {
  display: 'flex',
  gap: '1.5rem',
  listStyle: 'none',
  alignItems: 'center',
  margin: 0,
};

const linkStyle = {
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  transition: 'color 0.3s',
};

const userInfoStyle = {
  color: '#0f0',
  fontWeight: 'bold',
  fontSize: '0.9rem',
};

const logoutBtnStyle = {
  backgroundColor: '#e63946',
  color: '#fff',
  border: 'none',
  padding: '0.4rem 0.8rem',
  borderRadius: '4px',
  fontWeight: 'bold',
  cursor: 'pointer',
  transition: 'background 0.3s',
};

const langBtnStyle = {
  backgroundColor: 'transparent',
  color: '#fff',
  border: '1px solid #fff',
  padding: '0.3rem 0.6rem',
  borderRadius: '4px',
  cursor: 'pointer',
};

export default Navbar;
