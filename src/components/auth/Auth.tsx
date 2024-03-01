import React, { useState } from "react";

import "./Auth.css";

const Auth: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

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
            onClick={() => console.log("forgot")}
          >
            forgot password
          </button>
          <button
            className="create-account"
            onClick={() => console.log("create")}
          >
            create account
          </button>
        </footer>
      </div>
    </div>
  );
};

export default Auth;
