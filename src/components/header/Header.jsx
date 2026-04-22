import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'
import './Header.css'

function Header({ user, setUser }) {
  const navigate = useNavigate()

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      navigate('/')
    } catch (error) {
      console.error('Logout failed', error)
    }
  }

const rawUsername = user?.email ? user.email.split("@")[0] : "";

const username = rawUsername
  ? rawUsername.replace(/[^a-zA-Z]/g, "").toLowerCase()
  : "";

console.log(username);

  return (
    <header className="site-header">
      <div className="header-inner">
        <div className="header-brand ">
          <h1>Quick Stay</h1>
        </div>

        <nav className="header-nav" aria-label="Main navigation">
          <ul className="nav-list ">
            <li>
              <Link to="/">Rooms</Link>
            </li>
            <li>
              <Link to="/bookings">Bookings</Link>
            </li>
          </ul>
        </nav>

        <div className="auth-actions ">
          {user ? (
            <>
              <span className="auth-user">Hello, {username}</span>
              <button className="button button-secondary" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link className=" button button-secondary" to="/login">
                Login
              </Link>
              <Link className="button button-primary" to="/signup">
                Sign Up
              </Link>
            </>
          )}
        </div>
      </div>
    </header>
  )
}

export default Header
