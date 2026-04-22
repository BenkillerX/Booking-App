import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'
import { auth } from '../../config/firebase'
import './Header.css'

function Header({ user, setUser }) {
  const navigate = useNavigate()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const handleLogout = async () => {
    try {
      await signOut(auth)
      setUser(null)
      navigate('/')
    } catch (error) {
      console.error('Logout failed', error)
      alert('Logout failed. Please try again.')
    }
  }

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  const closeMobileMenu = () => {
    setIsMobileMenuOpen(false)
  }

const rawUsername = user?.email ? user.email.split("@")[0] : "";

const username = rawUsername
  ? rawUsername.replace(/[^a-zA-Z]/g, "").toLowerCase()
  : "";

console.log(username);

  return (
    <>
      <header className="site-header">
        <div className="header-inner">
          <div className="header-brand">
            <h1>Quick Stay</h1>
          </div>

          <nav className="header-nav" aria-label="Main navigation">
            <ul className="nav-list">
              <li>
                <Link to="/" onClick={closeMobileMenu}>Rooms</Link>
              </li>
              <li>
                <Link to="/bookings" onClick={closeMobileMenu}>Bookings</Link>
              </li>
            </ul>
          </nav>

          <div className="auth-actions">
            {user ? (
              <>
                <span className="auth-user">Hello, {username}</span>
                <button className="button button-secondary" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="button button-secondary" to="/login" onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link className="button button-primary" to="/signup" onClick={closeMobileMenu}>
                  Sign Up
                </Link>
              </>
            )}
          </div>

          <button
            className="mobile-menu-toggle"
            onClick={toggleMobileMenu}
            aria-label="Toggle mobile menu"
            aria-expanded={isMobileMenuOpen}
          >
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
            <span className="hamburger-line"></span>
          </button>
        </div>
      </header>

      {/* Mobile Sidebar */}
      <div className={`mobile-sidebar ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-sidebar-content">
          <div className="mobile-sidebar-header">
            <h2>Quick Stay</h2>
            <button
              className="mobile-sidebar-close"
              onClick={closeMobileMenu}
              aria-label="Close mobile menu"
            >
              ×
            </button>
          </div>

          <nav className="mobile-nav" aria-label="Mobile navigation">
            <ul className="mobile-nav-list">
              <li>
                <Link to="/" onClick={closeMobileMenu}>Rooms</Link>
              </li>
              <li>
                <Link to="/bookings" onClick={closeMobileMenu}>Bookings</Link>
              </li>
            </ul>
          </nav>

          <div className="mobile-auth-actions">
            {user ? (
              <>
                <span className="mobile-auth-user">Hello, {username}</span>
                <button className="button button-secondary mobile-logout" onClick={() => { handleLogout(); closeMobileMenu(); }}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link className="button button-secondary" to="/login" onClick={closeMobileMenu}>
                  Login
                </Link>
                <Link className="button button-primary" to="/signup" onClick={closeMobileMenu}>
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Overlay */}
      {isMobileMenuOpen && (
        <div className="mobile-overlay" onClick={closeMobileMenu}></div>
      )}
    </>
  )
}

export default Header
