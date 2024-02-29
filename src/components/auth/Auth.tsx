import React, { useState } from "react";

import "./Auth.css";

const Auth: React.FC<{ step: string }> = ({ step }: { step: string }) => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");
  const [step_auth, setStep] = useState(step);

  if (step_auth === "login") {
    return (
      <div className="auth">
        <div className="auth-form">
          <header className="auth-form-header">
            <h2 className="header-text">Log in</h2>
          </header>
          <section className="auth-form-transfer">
            <div className="auth-form-inputs">
              <input
                type="text"
                className="login"
                placeholder="login"
                value={login}
                onChange={(e) => setLogin((login) => (login = e.target.value))}
              />
              <input
                type="password"
                className="password"
                placeholder="password"
                value={password}
                onChange={(e) =>
                  setPassword((password) => (password = e.target.value))
                }
              />
            </div>
            <div className="auth-form-continue">
              <button
                className="send-to-check"
                onClick={() => console.log("check in base")}
              >
                Continue
              </button>
            </div>
          </section>
          <footer className="auth-form-footer">
            <button
              className="forgot-password"
              onClick={() => setStep((step_auth) => (step_auth = "forgot"))}
            >
              forgot password
            </button>
            <button
              className="create-account"
              onClick={() => setStep((step_auth) => (step_auth = "create"))}
            >
              create account
            </button>
          </footer>
        </div>
      </div>
    );
  } else if (step_auth === "forgot") {
    return <div className="1"></div>;
  } else if (step_auth === "create") {
    return <div className="1"></div>;
  } else {
    return <div className="404">sorry we have a trouble</div>;
  }
};

export default Auth;
