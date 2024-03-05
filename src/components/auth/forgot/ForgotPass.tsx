import React, { useState } from "react";
import HeaderForm from "../../generic/HeaderForm";
import { Link } from "react-router-dom";

import './ForgotPass.css'

const ForgotPass = () => {
  const [email, setEmail] = useState('')
  const [pass, setPassword] = useState('')

  return (
    <div className="forgot-password">
      <div className="forgot-password-form">
        <HeaderForm header="Forgot password" />
        <section className="forgot-form-transfer">
          <div className="forgot-form-inputs">
            <input
              type="text"
              className="email"
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(email => email = e.target.value)}
            />
            <input
              type="password"
              className="password"
              placeholder="password"
              value={pass}
              onChange={(e) =>
                setPassword(pass => pass = e.target.value)
              }
            />
            
          </div>
					<div className="forgot-form-continue">
            <button
              className="send-to-check"
              onClick={() => console.log("check in base")}
            >
              Continue
            </button>
          </div>
        </section>
				<footer className="forgot-form-footer">
          <Link to="/" className="login">
						login
					</Link>
					<Link to="/register" className="create-account">
						create account
					</Link>
        </footer>
      </div>
    </div>
  );
};

export default ForgotPass;
