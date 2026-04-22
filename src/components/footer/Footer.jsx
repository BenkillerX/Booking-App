import { Link } from 'react-router-dom'
import './Footer.css'

function Footer() {

  const currentYear = new Date().getFullYear()

  return (
    <footer className="site-footer">
      <div className="footer-content">
        {/* Brand Section */}
        <div className="footer-section footer-brand">
          <div className="footer-logo">
            <h3>Quick Stay</h3>
            <p>Your trusted booking companion for seamless reservations</p>
          </div>

        </div>

        {/* Company Links */}
        <div className="footer-section">
          <h4>Company</h4>
          <ul className="footer-links">
            <li>
              <a href="#about">About Us</a>
            </li>
            <li>
              <a href="#careers">Careers</a>
            </li>
            <li>
              <a href="#blog">Blog</a>
            </li>
            <li>
              <a href="#press">Press</a>
            </li>
          </ul>
        </div>

        {/* Legal Links */}
        <div className="footer-section">
          <h4>Legal</h4>
          <ul className="footer-links">
            <li>
              <a href="#privacy">Privacy Policy</a>
            </li>
            <li>
              <a href="#terms">Terms of Service</a>
            </li>
            <li>
              <a href="#cookies">Cookie Policy</a>
            </li>
            <li>
              <a href="#contact">Contact</a>
            </li>
          </ul>
        </div>


      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <div className="footer-bottom-inner">
          <p className="copyright">
            &copy; {currentYear} Quick Stay. All rights reserved.
          </p>
          <div className="footer-bottom-links">
            <a href="#privacy">Privacy</a>
            <span className="divider">•</span>
            <a href="#terms">Terms</a>
            <span className="divider">•</span>
            <a href="#contact">Contact</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
