import React, { useState } from "react";

import "./Auth.scss";
import HeaderForm from "../../generic/HeaderForm";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/auth/auth.service";
import { getUser } from "../../../services/auth/auth.helper";
import { taskSlice } from "../../../hooks/reducers/taskSlice";
import { useAppDispatch } from "../../../hooks/redux";

const Auth: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { pushCurrentUser } = taskSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate()

  const loginClick = async () => {
    const data = { login, password };

    await AuthService.login(data)
      .catch((e) => console.log(e))
      .then(async () => {
        dispatch(pushCurrentUser(await getUser()));
        await isLogged()
      });
  };

  const isLogged = async () => {
    if(Object.keys(await getUser().then((res) => res)).length !== 0) {
      dispatch(pushCurrentUser(await getUser()));
      return navigate("/workspace")
    }
  };
  isLogged();

  return (
    <div className="auth">
      <div className="auth-form">
        <HeaderForm header="Log in" />
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
            <button className="send-to-check" onClick={() => loginClick()}>
              Continue
            </button>
          </div>
        </section>
        <footer className="auth-form-footer">
          <Link to="forgot-password" className="forgot-password">
            forgot password
          </Link>
          <Link to="/register" className="create-account">
            create account
          </Link>
        </footer>
      </div>
    </div>
  );
};

export default Auth;
