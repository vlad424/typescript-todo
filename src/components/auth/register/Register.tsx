import React from "react";
import { Link } from "react-router-dom";
import HeaderForm from "../../generic/HeaderForm";

const Register = () => {
  return (
    <div className="register">
      <div className="register-form">
        <HeaderForm header="Register now" />
        <section className="register-form-transfer">
          <div className="register-form-inputs">
            <input
              type="text"
              className="email"
              placeholder="email"
              value={"1"}
              onChange={(e) => console.log(e)}
            />
            <input
              type="password"
              className="password"
              placeholder="password"
              value={"1"}
              onChange={(e) => console.log(e)}
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
					<Link to="forgot-password" className="forgot-password">
            forgot password
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Register;
