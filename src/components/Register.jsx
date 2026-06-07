import React from 'react';

export default function Register() {
  const handleRegister = (e) => {
    e.preventDefault();
    window.location.href = '/cms/dashboard';
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <div className="auth-header">
          <a href="/">
            <img src="/images/un-logo.png" alt="UN Indonesia" className="auth-logo" />
          </a>
          <h2>Create an Account</h2>
          <p>Join the DOMES platform</p>
        </div>
        
        <form className="auth-form" onSubmit={handleRegister}>
          <div className="form-group">
            <label htmlFor="name">Full Name</label>
            <input type="text" id="name" required placeholder="e.g. Aldi Taher" />
          </div>

          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" required placeholder="name@un.org" />
          </div>
          
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" required placeholder="Create a strong password" />
          </div>

          <button type="submit" className="btn-primary full-width">Register</button>
        </form>

        <div className="auth-footer">
          <p>Already have an account? <a href="/login">Sign In</a></p>
        </div>
      </div>
    </div>
  );
}
