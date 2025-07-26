import axios from 'axios';
import { useState } from 'react';
import { FaEye, FaEyeSlash, FaUser, FaEnvelope, FaLock, FaPhone, FaGlobe } from 'react-icons/fa';
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
  const [hovered, setHovered] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const navigate = useNavigate();

  const apiClient = axios.create({
    baseURL: 'http://localhost:5000',
    withCredentials: true,
  });

  const validatePassword = (pass) =>
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(pass);

  const validateEmail = (email) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear errors when user starts typing
    if (errorMessages.length > 0) {
      setErrorMessages([]);
    }
  };

  const validateForm = () => {
    const errors = [];
    const required = ['firstName', 'lastName', 'nationality', 'phoneNumber', 'email', 'username', 'password'];
    
    required.forEach(field => {
      if (!form[field].trim()) {
        errors.push(`${field.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())} is required`);
      }
    });

    if (form.email && !validateEmail(form.email)) {
      errors.push('Please enter a valid email address');
    }

    if (form.password && !validatePassword(form.password)) {
      errors.push('Password must contain at least 8 characters with uppercase, lowercase, number and special character');
    }

    if (form.phoneNumber && !/^\d{8,15}$/.test(form.phoneNumber)) {
      errors.push('Phone number must be between 8-15 digits');
    }

    return errors;
  };

  const handleRegister = async () => {
    const validationErrors = validateForm();
    if (validationErrors.length > 0) {
      setErrorMessages(validationErrors);
      return;
    }

    setErrorMessages([]);
    setLoading(true);
    
    try {
      await apiClient.post('/auth/register', {
        name: `${form.firstName} ${form.lastName}`,
        nationality: form.nationality,
        phone: `${form.countryCode}${form.phoneNumber}`,
        email: form.email,
        username: form.username,
        password: form.password,
      });
      
      setSuccessMessage('🎉 Account created successfully! Redirecting to login...');
      setTimeout(() => navigate('/login'), 2500);
    } catch (err) {
      const errorMsg = err.response?.data?.message || 'Registration failed. Please try again.';
      setErrorMessages([errorMsg]);
    } finally {
      setLoading(false);
    }
  };

  const countries = [
    'Egypt', 'Saudi Arabia', 'United Arab Emirates', 'Kuwait', 'Qatar', 'Bahrain', 
    'Oman', 'Jordan', 'Lebanon', 'Morocco', 'Tunisia', 'Algeria', 'Libya',
    'United States', 'United Kingdom', 'Germany', 'France', 'Italy', 'Spain',
    'Canada', 'Australia', 'Japan', 'South Korea', 'Singapore', 'Malaysia'
  ];

  const countryCodes = [
    { code: '+20', country: 'Egypt' },
    { code: '+966', country: 'Saudi Arabia' },
    { code: '+971', country: 'UAE' },
    { code: '+965', country: 'Kuwait' },
    { code: '+974', country: 'Qatar' },
    { code: '+973', country: 'Bahrain' },
    { code: '+968', country: 'Oman' },
    { code: '+962', country: 'Jordan' },
    { code: '+961', country: 'Lebanon' },
    { code: '+1', country: 'US/Canada' },
    { code: '+44', country: 'UK' },
    { code: '+49', country: 'Germany' },
    { code: '+33', country: 'France' },
  ];

  return (
    <div style={wrapperStyle}>
      <div style={containerStyle}>
        {/* Logo Section */}
        <div style={logoContainerStyle}>
          <img src={logo} alt="Valorem Logo" style={logoStyle} />
          <div style={brandTextStyle}>Valorem</div>
        </div>
        
        <h2 style={titleStyle}>Create Your Account</h2>
        <p style={subtitleStyle}>Join Valorem and start your journey with us</p>

        {/* Progress Indicator */}
        <div style={progressContainerStyle}>
          <div style={progressBarStyle}>
            <div style={{...progressFillStyle, width: `${(Object.values(form).filter(v => v.trim()).length / 8) * 100}%`}}></div>
          </div>
          <span style={progressTextStyle}>
            {Object.values(form).filter(v => v.trim()).length} of 8 fields completed
          </span>
        </div>

        {/* Messages */}
        {successMessage && (
          <div style={successStyle}>
            <div style={messageIconStyle}>✅</div>
            {successMessage}
          </div>
        )}
        
        {errorMessages.length > 0 && (
          <div style={errorStyle}>
            <div style={messageIconStyle}>⚠️</div>
            <div>
              {errorMessages.map((msg, idx) => (
                <p key={idx} style={errorItemStyle}>{msg}</p>
              ))}
            </div>
          </div>
        )}

        <form style={formStyle}>
          {/* Personal Information */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>
              <FaUser style={sectionIconStyle} />
              Personal Information
            </h3>
            
            <div style={rowStyle}>
              <div style={fieldContainerStyle}>
                <label style={labelStyle}>First Name *</label>
                <input
                  name="firstName"
                  placeholder="Enter your first name"
                  value={form.firstName}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
              
              <div style={fieldContainerStyle}>
                <label style={labelStyle}>Last Name *</label>
                <input
                  name="lastName"
                  placeholder="Enter your last name"
                  value={form.lastName}
                  onChange={handleChange}
                  style={inputStyle}
                />
              </div>
            </div>

            <div style={fieldContainerStyle}>
              <label style={labelStyle}>
                <FaGlobe style={inputIconStyle} />
                Nationality *
              </label>
              <select
                name="nationality"
                value={form.nationality}
                onChange={handleChange}
                style={selectStyle}
              >
                <option value="">Select your nationality</option>
                {countries.map(country => (
                  <option key={country} value={country}>{country}</option>
                ))}
              </select>
            </div>
          </div>

          {/* Contact Information */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>
              <FaPhone style={sectionIconStyle} />
              Contact Information
            </h3>
            
            <div style={phoneRowStyle}>
              <div style={countryCodeContainerStyle}>
                <label style={labelStyle}>Code</label>
                <select
                  name="countryCode"
                  value={form.countryCode}
                  onChange={handleChange}
                  style={countryCodeSelectStyle}
                >
                  {countryCodes.map(({ code, country }) => (
                    <option key={code} value={code}>{code} ({country})</option>
                  ))}
                </select>
              </div>
              
              <div style={phoneNumberContainerStyle}>
                <label style={labelStyle}>Phone Number *</label>
                <input
                  name="phoneNumber"
                  placeholder="Enter phone number"
                  value={form.phoneNumber}
                  onChange={handleChange}
                  style={inputStyle}
                  type="tel"
                />
              </div>
            </div>

            <div style={fieldContainerStyle}>
              <label style={labelStyle}>
                <FaEnvelope style={inputIconStyle} />
                Email Address *
              </label>
              <input
                name="email"
                placeholder="Enter your email address"
                type="email"
                value={form.email}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>
          </div>

          {/* Account Security */}
          <div style={sectionStyle}>
            <h3 style={sectionTitleStyle}>
              <FaLock style={sectionIconStyle} />
              Account Security
            </h3>
            
            <div style={fieldContainerStyle}>
              <label style={labelStyle}>Username *</label>
              <input
                name="username"
                placeholder="Choose a unique username"
                value={form.username}
                onChange={handleChange}
                style={inputStyle}
              />
            </div>

            <div style={fieldContainerStyle}>
              <label style={labelStyle}>Password *</label>
              <div style={passwordContainerStyle}>
                <input
                  type={showPassword ? 'text' : 'password'}
                  name="password"
                  placeholder="Create a strong password"
                  value={form.password}
                  onChange={handleChange}
                  style={passwordInputStyle}
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
              
              {/* Password Requirements */}
              <div style={passwordHintsStyle}>
                <p style={passwordHintStyle}>Password must contain:</p>
                <ul style={passwordRequirementsStyle}>
                  <li style={getRequirementStyle(/[a-z]/.test(form.password))}>
                    At least one lowercase letter
                  </li>
                  <li style={getRequirementStyle(/[A-Z]/.test(form.password))}>
                    At least one uppercase letter
                  </li>
                  <li style={getRequirementStyle(/\d/.test(form.password))}>
                    At least one number
                  </li>
                  <li style={getRequirementStyle(/[\W_]/.test(form.password))}>
                    At least one special character
                  </li>
                  <li style={getRequirementStyle(form.password.length >= 8)}>
                    Minimum 8 characters
                  </li>
                </ul>
              </div>
            </div>
          </div>

          <button
            type="button"
            onClick={handleRegister}
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
                Creating Account...
              </div>
            ) : (
              'Create Account'
            )}
          </button>

          <div style={loginLinkStyle}>
            Already have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/login')}
              style={linkButtonStyle}
            >
              Sign in here
            </button>
          </div>
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
  successBg: '#f0fdf4',
};

// Helper function for password requirements
const getRequirementStyle = (met) => ({
  ...passwordRequirementStyle,
  color: met ? colors.success : colors.charcoalGrayLight,
  '::before': {
    content: met ? '✓' : '○',
    color: met ? colors.success : colors.charcoalGrayLight,
  }
});

// ====== STYLES ======
const wrapperStyle = {
  background: `linear-gradient(135deg, ${colors.deepViolet} 0%, ${colors.electricBlue} 50%, ${colors.neoMint} 100%)`,
  fontFamily: "'Aktiv Grotesk', 'Inter', 'Segoe UI', sans-serif",
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '2rem 1rem',
  position: 'relative',
  overflow: 'hidden',
};

const containerStyle = {
  background: 'rgba(255, 255, 255, 0.95)',
  padding: '3rem 2.5rem',
  borderRadius: '24px',
  width: '100%',
  maxWidth: '600px',
  boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
  textAlign: 'center',
  backdropFilter: 'blur(16px)',
  border: '1px solid rgba(255, 255, 255, 0.3)',
  position: 'relative',
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

const progressContainerStyle = {
  marginBottom: '2rem',
  textAlign: 'left',
};

const progressBarStyle = {
  width: '100%',
  height: '6px',
  backgroundColor: colors.background,
  borderRadius: '3px',
  overflow: 'hidden',
  marginBottom: '0.5rem',
};

const progressFillStyle = {
  height: '100%',
  background: `linear-gradient(90deg, ${colors.deepViolet}, ${colors.electricBlue})`,
  borderRadius: '3px',
  transition: 'width 0.3s ease',
};

const progressTextStyle = {
  fontSize: '0.875rem',
  color: colors.charcoalGrayLight,
  fontWeight: '500',
};

const formStyle = {
  textAlign: 'left',
};

const sectionStyle = {
  marginBottom: '2rem',
  padding: '1.5rem',
  backgroundColor: 'rgba(255, 255, 255, 0.5)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.8)',
};

const sectionTitleStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
  marginBottom: '1.5rem',
  fontSize: '1.125rem',
  fontWeight: '600',
  color: colors.deepViolet,
  fontFamily: "'Nizzoli Rta', 'Helvetica Neue', Arial, sans-serif",
};

const sectionIconStyle = {
  fontSize: '1rem',
  color: colors.electricBlue,
};

const rowStyle = {
  display: 'flex',
  gap: '1rem',
  marginBottom: '1rem',
};

const fieldContainerStyle = {
  flex: 1,
  marginBottom: '1.5rem',
};

const labelStyle = {
  display: 'flex',
  alignItems: 'center',
  gap: '0.5rem',
  marginBottom: '0.75rem',
  fontWeight: '500',
  color: colors.charcoalGray,
  fontSize: '0.875rem',
  letterSpacing: '0.01em',
};

const inputIconStyle = {
  fontSize: '0.875rem',
  color: colors.electricBlue,
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
};

const selectStyle = {
  ...inputStyle,
  cursor: 'pointer',
};

const phoneRowStyle = {
  display: 'flex',
  gap: '1rem',
  marginBottom: '1rem',
};

const countryCodeContainerStyle = {
  flex: '0 0 140px',
};

const phoneNumberContainerStyle = {
  flex: 1,
};

const countryCodeSelectStyle = {
  ...selectStyle,
  fontSize: '0.875rem',
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
};

const passwordHintsStyle = {
  marginTop: '1rem',
  padding: '1rem',
  backgroundColor: colors.background,
  borderRadius: '8px',
  border: `1px solid ${colors.background}`,
};

const passwordHintStyle = {
  margin: '0 0 0.5rem 0',
  fontSize: '0.875rem',
  fontWeight: '500',
  color: colors.charcoalGray,
};

const passwordRequirementsStyle = {
  margin: 0,
  padding: 0,
  listStyle: 'none',
};

const passwordRequirementStyle = {
  fontSize: '0.75rem',
  marginBottom: '0.25rem',
  paddingLeft: '1.5rem',
  position: 'relative',
  '::before': {
    position: 'absolute',
    left: '0',
    fontWeight: 'bold',
  }
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

const successStyle = {
  backgroundColor: colors.successBg,
  color: colors.success,
  padding: '1rem 1.25rem',
  borderRadius: '12px',
  marginBottom: '1.5rem',
  border: `1px solid ${colors.success}20`,
  textAlign: 'left',
  fontSize: '0.875rem',
  fontWeight: '500',
  display: 'flex',
  alignItems: 'center',
  gap: '0.75rem',
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
  alignItems: 'flex-start',
  gap: '0.75rem',
};

const messageIconStyle = {
  fontSize: '1rem',
  flexShrink: 0,
  marginTop: '0.125rem',
};

const errorItemStyle = {
  margin: '0.25rem 0',
  lineHeight: '1.4',
};

const loginLinkStyle = {
  textAlign: 'center',
  fontSize: '0.875rem',
  color: colors.charcoalGrayLight,
  marginBottom: '1rem',
};

const linkButtonStyle = {
  background: 'none',
  border: 'none',
  color: colors.electricBlue,
  cursor: 'pointer',
  fontWeight: '500',
  textDecoration: 'underline',
  fontSize: '0.875rem',
  padding: 0,
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
  
  input:focus, select:focus {
    border-color: ${colors.electricBlue} !important;
    box-shadow: 0 0 0 4px ${colors.electricBlueLight}33 !important;
  }
  
  input::placeholder {
    color: ${colors.charcoalGrayLight} !important;
  }
  
  .password-requirement {
    position: relative;
  }
  
  .password-requirement.met::before {
    content: '✓';
    color: ${colors.success};
    font-weight: bold;
    position: absolute;
    left: 0;
  }
  
  .password-requirement:not(.met)::before {
    content: '○';
    color: ${colors.charcoalGrayLight};
    position: absolute;
    left: 0;
  }
  
  @media (max-width: 768px) {
    .register-container {
      padding: 2rem 1.5rem !important;
      margin: 1rem !important;
    }
    
    .register-title {
      font-size: 1.5rem !important;
    }
    
    .phone-row {
      flex-direction: column !important;
      gap: 0.5rem !important;
    }
    
    .country-code-container {
      flex: none !important;
    }
    
    .form-row {
      flex-direction: column !important;
      gap: 0.5rem !important;
    }
  }
`;
document.head.appendChild(styleSheet);

export default Register;