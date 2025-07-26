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
  const [langHovered, setLangHovered] = useState(false);

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

  const navItems = ['home', 'about', 'courses', 'community'];

  return (
    <nav style={navbarStyle} className={lang === 'ar' ? 'text-arabic' : ''}>
      {/* Logo */}
      <div style={logoContainerStyle}>
        <img
          src={logoFull}
          alt="Valorem Logo"
          style={logoImageStyle}
          onClick={() => navigate('/')}
        />
      </div>

      {/* Navigation Links */}
   <ul style={{ ...navLinksStyle, direction: lang === 'ar' ? 'rtl' : 'ltr' }}>
  {navItems.map((item, index) => (
    <li key={item}>
      {item === 'community' ? (
        <a
          href="https://www.facebook.com/share/g/12Lx8FtbRCj/"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            ...linkStyle,
            ...(hovered === index ? linkHoverStyle : {})
          }}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          {text[item]}
        </a>
      ) : (
        <Link
          to={`/${item === 'home' ? '' : item}`}
          style={{
            ...linkStyle,
            ...(hovered === index ? linkHoverStyle : {})
          }}
          onMouseEnter={() => setHovered(index)}
          onMouseLeave={() => setHovered(null)}
        >
          {text[item]}
        </Link>
      )}
    </li>
  ))}

  {/* Admin Link */}
  {user?.role === 'admin' && (
    <li>
      <Link
        to="/admin"
        style={{
          ...linkStyle,
          ...(hovered === 'admin' ? adminLinkHoverStyle : {})
        }}
        onMouseEnter={() => setHovered('admin')}
        onMouseLeave={() => setHovered(null)}
      >
        <span style={{ marginLeft: lang === 'ar' ? '0' : '6px', marginRight: lang === 'ar' ? '6px' : '0' }}>👑</span>
        {text.admin}
      </Link>
    </li>
  )}

  {/* Auth Links */}
  {!user ? (
    <>
      <li>
        <Link
          to="/login"
          style={{
            ...authLinkStyle,
            ...(hovered === 'login' ? authLinkHoverStyle : {})
          }}
          onMouseEnter={() => setHovered('login')}
          onMouseLeave={() => setHovered(null)}
        >
          {text.login}
        </Link>
      </li>
      <li>
        <Link
          to="/register"
          style={{
            ...ctaLinkStyle,
            ...(hovered === 'register' ? ctaLinkHoverStyle : {})
          }}
          onMouseEnter={() => setHovered('register')}
          onMouseLeave={() => setHovered(null)}
        >
          {text.register}
        </Link>
      </li>
    </>
  ) : (
    <>
      <li style={userInfoStyle}>
        <span style={{ marginLeft: lang === 'ar' ? '0' : '8px', marginRight: lang === 'ar' ? '8px' : '0' }}>👤</span>
        {user.firstName} {user.lastName}
      </li>
      <li>
        <button
          onClick={handleLogout}
          style={{
            ...logoutBtnStyle,
            ...(logoutHovered ? logoutBtnHoverStyle : {})
          }}
          onMouseEnter={() => setLogoutHovered(true)}
          onMouseLeave={() => setLogoutHovered(false)}
        >
          <svg 
            style={logoutIconStyle}
            fill="currentColor" 
            viewBox="0 0 24 24"
          >
            <path d="M16 17v-3H9v-4h7V7l5 5-5 5M14 2a2 2 0 012 2v2h-2V4H5v16h9v-2h2v2a2 2 0 01-2 2H5a2 2 0 01-2-2V4a2 2 0 012-2h9z"/>
          </svg>
          {text.logout || 'تسجيل الخروج'}
        </button>
      </li>
    </>
  )}

  {/* Language Toggle */}
  <li>
    <button
      onClick={toggleLang}
      style={{
        ...langBtnStyle,
        ...(langHovered ? langBtnHoverStyle : {})
      }}
      onMouseEnter={() => setLangHovered(true)}
      onMouseLeave={() => setLangHovered(false)}
    >
      <span style={{ marginLeft: lang === 'ar' ? '0' : '6px', marginRight: lang === 'ar' ? '6px' : '0' }}>
        🌐
      </span>
      {lang === 'ar' ? 'English' : 'عربي'}
    </button>
  </li>
</ul>

    </nav>
  );
}

// ========== STYLES ==========
const navbarStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  background: `
    linear-gradient(90deg, 
      rgba(76, 29, 149, 0.95) 0%,    /* Deep Violet with transparency */
      rgba(55, 48, 163, 0.95) 50%,   /* Deep Violet Dark with transparency */
      rgba(76, 29, 149, 0.95) 100%   /* Deep Violet with transparency */
    )
  `,
  backdropFilter: 'blur(20px)',
  padding: '1rem 2rem',
  boxShadow: '0 4px 20px rgba(76, 29, 149, 0.3)',
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
  position: 'sticky',
  top: 0,
  zIndex: 1000,
  transition: 'all 0.3s ease',
};

const logoContainerStyle = {
  display: 'flex',
  alignItems: 'center',
  cursor: 'pointer',
  transition: 'transform 0.3s ease',
  ':hover': {
    transform: 'scale(1.05)',
  }
};

const logoImageStyle = {
  height: '50px',
  objectFit: 'contain',
  filter: 'drop-shadow(0 2px 8px rgba(255, 255, 255, 0.2))',
  transition: 'all 0.3s ease',
};

const navLinksStyle = {
  display: 'flex',
  gap: '2rem',
  listStyle: 'none',
  alignItems: 'center',
  margin: 0,
  padding: 0,
  flexWrap: 'wrap',
};

const linkStyle = {
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif", // Secondary font
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '1rem',           // --font-size-base
  fontWeight: 500,            // Medium weight
  padding: '0.5rem 1rem',
  borderRadius: '8px',
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  position: 'relative',
  letterSpacing: '0.025em',   // Wide letter spacing
  textTransform: 'capitalize',
};

const linkHoverStyle = {
  color: '#10b981',           // Neo Mint
  backgroundColor: 'rgba(16, 185, 129, 0.1)',
  transform: 'translateY(-2px)',
  textShadow: '0 2px 10px rgba(16, 185, 129, 0.4)',
};

const adminLinkHoverStyle = {
  color: '#fbbf24',           // Golden color for admin
  backgroundColor: 'rgba(251, 191, 36, 0.1)',
  transform: 'translateY(-2px)',
  textShadow: '0 2px 10px rgba(251, 191, 36, 0.4)',
};

const authLinkStyle = {
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
  color: '#ffffff',
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 500,
  padding: '0.6rem 1.2rem',
  borderRadius: '25px',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  transition: 'all 0.3s ease',
  backgroundColor: 'rgba(255, 255, 255, 0.05)',
};

const authLinkHoverStyle = {
  backgroundColor: 'rgba(255, 255, 255, 0.15)',
  borderColor: 'rgba(255, 255, 255, 0.5)',
  transform: 'translateY(-2px)',
};

const ctaLinkStyle = {
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
  color: '#4c1d95',           // Deep Violet
  textDecoration: 'none',
  fontSize: '1rem',
  fontWeight: 600,            // Semibold
  padding: '0.6rem 1.5rem',
  borderRadius: '25px',
  backgroundColor: '#10b981',  // Neo Mint
  transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
  border: '2px solid #10b981',
  textTransform: 'uppercase',
  letterSpacing: '0.05em',
};

const ctaLinkHoverStyle = {
  backgroundColor: '#059669',  // Neo Mint Dark
  borderColor: '#059669',
  transform: 'translateY(-3px) scale(1.05)',
  boxShadow: '0 8px 20px rgba(16, 185, 129, 0.4)',
};

const userInfoStyle = {
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
  color: '#10b981',           // Neo Mint
  fontWeight: 600,            // Semibold
  fontSize: '1rem',
  padding: '0.5rem 1rem',
  backgroundColor: 'rgba(16, 185, 129, 0.1)',
  borderRadius: '20px',
  border: '1px solid rgba(16, 185, 129, 0.3)',
  display: 'flex',
  alignItems: 'center',
};

// Professional Logout Button Styles
const logoutBtnStyle = {
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
  backgroundColor: 'rgba(255, 255, 255, 0.95)',
  color: '#374151',           // Professional gray color
  border: '1px solid rgba(229, 231, 235, 0.8)',
  padding: '0.5rem 1rem',
  borderRadius: '8px',        // Less rounded for formal look
  fontWeight: 500,            // Medium weight for readability
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
  minWidth: '100px',
  justifyContent: 'center',
  textTransform: 'none',      // No uppercase for formal look
  letterSpacing: 'normal',
};

const logoutBtnHoverStyle = {
  backgroundColor: '#f3f4f6',  // Light gray background on hover
  borderColor: '#d1d5db',
  color: '#111827',           // Darker text on hover
  transform: 'translateY(-1px)',
  boxShadow: '0 4px 12px rgba(0, 0, 0, 0.15)',
};

const logoutIconStyle = {
  width: '16px',
  height: '16px',
  transition: 'transform 0.2s ease',
};

const langBtnStyle = {
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
  backgroundColor: 'rgba(255, 255, 255, 0.9)',
  color: '#4c1d95',           // Deep Violet
  border: '2px solid rgba(255, 255, 255, 0.3)',
  padding: '0.5rem 1rem',
  borderRadius: '25px',
  fontWeight: 500,            // Medium
  cursor: 'pointer',
  transition: 'all 0.3s ease',
  fontSize: '0.9rem',
  display: 'flex',
  alignItems: 'center',
};

const langBtnHoverStyle = {
  backgroundColor: '#ffffff',
  borderColor: '#4c1d95',
  transform: 'translateY(-2px)',
  boxShadow: '0 4px 15px rgba(76, 29, 149, 0.2)',
};

// Add responsive styles
const mediaQueries = `
@media (max-width: 768px) {
  .navbar {
    padding: 0.8rem 1rem !important;
    flex-wrap: wrap;
  }
  
  .nav-links {
    gap: 1rem !important;
    font-size: 0.9rem !important;
  }
  
  .logo-image {
    height: 40px !important;
  }
}

@media (max-width: 640px) {
  .nav-links {
    display: none !important;
  }
  
  /* You might want to add a mobile menu toggle here */
}
`;

// Add media queries to document head
if (typeof document !== 'undefined') {
  const styleElement = document.createElement('style');
  styleElement.textContent = mediaQueries;
  document.head.appendChild(styleElement);
}

export default Navbar;