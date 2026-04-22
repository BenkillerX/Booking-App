import { useState } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../config/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );

      console.log("Logged in:", userCredential.user);

      // Update last login time in Firestore
      try {
        await updateDoc(doc(db, "users", userCredential.user.uid), {
          lastLogin: new Date()
        });
      } catch (updateError) {
        console.error("Error updating last login:", updateError);
        // Don't fail the login if updating last login fails
      }

      navigate("/");
    } catch (err) {
      console.log(err.message);
      setError('Error Logging in Do You have an account??');
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-card-inner">
          <h2 className="login-title">Welcome back</h2>
          <p className="login-subtitle">
            Sign in to your account and manage your bookings with ease.
          </p>

          <form className="login-form" onSubmit={handleLogin}>
            <input
              className="login-input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />

            <input
              className="login-input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <button className="login-button" type="submit">
              Login
            </button>
          </form>

          {error && <p className="login-error">{error}</p>}

          <p className="login-footer">
            Don't have an account? <Link to="/signup">Create one</Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;