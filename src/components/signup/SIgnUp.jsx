import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { auth, provider, db } from '../../config/firebase'
import { createUserWithEmailAndPassword, signInWithPopup } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import './SIgnUp.css'

const SIgnUp = ({ setUser }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const navigate = useNavigate()

  const SignUp = async () => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password)
      const { user } = userCredential

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0], // Use email prefix if no display name
        photoURL: user.photoURL || null,
        createdAt: new Date(),
        lastLogin: new Date(),
        provider: 'email'
      })

      setUser(user)
      navigate('/')
    } catch (err) {
      setError(err.message)
      console.error(err.code, err.message)
    }
  }

  const SignUpWithGoogke = async () => {
    try {
      const userCredential = await signInWithPopup(auth, provider)
      const user = userCredential.user

      // Store user data in Firestore
      await setDoc(doc(db, "users", user.uid), {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || user.email.split('@')[0],
        photoURL: user.photoURL || null,
        createdAt: new Date(),
        lastLogin: new Date(),
        provider: 'google'
      }, { merge: true }) // Use merge to avoid overwriting existing data

      setUser(user)
      navigate('/')
    } catch (error) {
      setError(error.code)
      console.error(error.code, error.message)
    }
  }

  return (
    <div className="signup-container">
      <div className="signup-card">
        <div className="signup-header">
          <h2>Create Account</h2>
          <p>Join Quick Stay to book amazing rooms</p>
        </div>

        <form className="signup-form" onSubmit={(e) => { e.preventDefault(); SignUp() }}>
          <div className="form-group">
            <label htmlFor="email">Email Address</label>
            <input
              id="email"
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              id="password"
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          {error && <p className="error-message">{error}</p>}

          <button type="submit" className="signup-button signup-button-primary">
            Sign Up
          </button>
        </form>

        <div className="divider">
          <span className="divider-text">or</span>
        </div>

        <button onClick={SignUpWithGoogke} className="signup-button signup-button-google">
          <svg className="google-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
          </svg>
          Sign Up with Google
        </button>

        <div className="signup-footer">
          Already have an account? <Link to="/login">Log in here</Link>
        </div>
      </div>
    </div>
  )
}

export default SIgnUp
