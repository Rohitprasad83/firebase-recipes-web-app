import React, { useState } from 'react'
import FirebaseAuthService from '../FirebaseAuthService'

function LoginForm({ existingUser }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  async function handleSubmit(e) {
    e.preventDefault()
    try {
      await FirebaseAuthService.loginUser(email, password)
      setEmail('')
      setPassword('')
    } catch (err) {
      alert(err.message)
    }
  }
  function handleLogout() {
    FirebaseAuthService.logoutUser()
  }

  async function forgotPassword() {
    try {
      await FirebaseAuthService.sendPasswordResetEmail(email)
      setEmail('')
    } catch (error) {
      alert(error.message)
    }
  }
  async function loginWithGoogle() {
    try {
      await FirebaseAuthService.loginWithGoogle()
    } catch (error) {
      alert(error.message)
    }
  }

  return (
    <div className="login-form-container">
      {existingUser !== null ? (
        <div className="row">
          <h3>Welcome, {existingUser.email}</h3>
          <button
            type="button"
            onClick={handleLogout}
            className="button-primary">
            Logout
          </button>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="login-form">
          <label className="input-label login-label">
            Enter your email
            <input
              type="email"
              name="email"
              required
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="input-text"
            />
          </label>
          <label className="input-label login-label">
            Enter your Password
            <input
              type="password"
              name="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="input-text"
            />
          </label>
          <div className="button-box">
            <button className="primary-button">Login</button>
            <button
              type="button"
              className="primary-button"
              onClick={forgotPassword}>
              Forgot Password
            </button>
            <button
              type="button"
              className="primary-button"
              onClick={loginWithGoogle}>
              Login with Google
            </button>
          </div>
        </form>
      )}
    </div>
  )
}

export default LoginForm
