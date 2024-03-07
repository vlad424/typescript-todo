import React, { useState } from "react";
import { Link } from "react-router-dom";
import HeaderForm from "../../generic/HeaderForm";

import './Register.scss'

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')


  return (
    <div className="register">
      <div className="register-form">
        <HeaderForm header="Register now" />
        <section className="register-form-transfer">
          <div className="register-form-inputs">
            <input
              type="text"
              className="first-name"
              placeholder="your name"
              value={firstName}
              onChange={(e) => setFirstName(firstName => firstName = e.target.value)}
            />
            <input
              type="text"
              className="last-name"
              placeholder="your last name"
              value={lastName}
              onChange={(e) => setLastName(lastName => lastName = e.target.value)}
            />
            <input
              type="text"
              className="login"
              placeholder="your login"
              value={login}
              onChange={(e) => setLogin(login => login = e.target.value)}
            />
            <input
              type="text"
              className="email"
              placeholder="your email"
              value={email}
              onChange={(e) => setEmail(email => email = e.target.value)}
            />
            <input
              type="password"
              className="password"
              placeholder="your password"
              value={password}
              onChange={(e) => setPassword(password => password = e.target.value)}
            />
          </div>
          <div className="register-form-continue">
            <button
              className="send-to-check"
              onClick={() => console.log("check in base")}
            >
              Continue
            </button>
          </div>
        </section>
        <footer className="register-form-footer">
          <Link to="/" className="login">
            login
          </Link>
					<Link to="/forgot-password" className="forgot-password">
            forgot password
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Register;
