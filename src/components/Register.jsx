import React from 'react';

export default function Register() {
  const handleRegister = (e) => {
    e.preventDefault();
    // Redirect ke login setelah register berhasil
    window.location.href = '/login';
  };

  return (
    <div className="auth-container">
      <div className="auth-card register-card">
        <div className="auth-header">
          <a href="/">
            <img src="/images/un-logo.png" alt="UN Indonesia" className="auth-logo" />
          </a>
          <h2>Create an Account</h2>
          <p>Document Management & Electronic System</p>
        </div>
        
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-row">
            <div className="form-group form-group-half">
              <label htmlFor="firstName">First Name</label>
              <input type="text" id="firstName" required placeholder="John" />
            </div>
            <div className="form-group form-group-half">
              <label htmlFor="lastName">Last Name</label>
              <input type="text" id="lastName" required placeholder="Doe" />
            </div>
          </div>
          
          <div className="form-group">
            <label htmlFor="position">Position</label>
            <input type="text" id="position" required placeholder="Your position" />
          </div>
          
          <div className="form-group">
            <label htmlFor="phone">Phone Number</label>
            <input type="tel" id="phone" required placeholder="+62 812 xxx xxxx" />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" required placeholder="name@un.org" />
          </div>
          
          <div className="form-row">
            <div className="form-group form-group-half">
              <label htmlFor="password">Password</label>
              <input type="password" id="password" required placeholder="••••••••" />
            </div>
            <div className="form-group form-group-half">
              <label htmlFor="confirmPassword">Confirm Password</label>
              <input type="password" id="confirmPassword" required placeholder="••••••••" />
            </div>
          </div>

          <div className="form-group">
            <label htmlFor="organization">Organization</label>
            <select id="organization" required>
              <option value="">Select an organization</option>
              <option value="unDP">UNDP - United Nations Development Programme</option>
              <option value="unicef">UNICEF - United Nations Children's Fund</option>
              <option value="who">WHO - World Health Organization</option>
              <option value="unhcr">UNHCR - United Nations Refugee Agency</option>
              <option value="wfp">WFP - World Food Programme</option>
              <option value="unfpa">UNFPA - United Nations Population Fund</option>
              <option value="ilo">ILO - International Labour Organization</option>
              <option value="unesco">UNESCO - United Nations Educational, Scientific and Cultural Organization</option>
            </select>
          </div>

          <label className="checkbox-label terms-label">
            <input type="checkbox" id="terms" required />
            <span>I accept the <a href="#" className="terms-link">terms and conditions</a></span>
          </label>

          {/* Dummy reCAPTCHA */}
          <div className="dummy-recaptcha">
            <div className="recaptcha-checkbox">
              <input type="checkbox" id="recaptcha-check" required />
              <label htmlFor="recaptcha-check">I'm not a robot</label>
            </div>
            <div className="recaptcha-logo">
              <img src="https://www.gstatic.com/recaptcha/api2/logo_48.png" alt="reCAPTCHA" />
              <span>reCAPTCHA<br/>Privacy - Terms</span>
            </div>
          </div>

          <button type="submit" className="btn-primary full-width">Register / Sign Up</button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Login here</a></p>
        </div>
      </div>
    </div>
  );
}