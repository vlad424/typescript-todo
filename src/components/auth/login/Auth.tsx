import React, { useEffect, useLayoutEffect, useState } from "react";

import "./Auth.scss";
import HeaderForm from "../../UI/HeaderForm";
import { Link, useNavigate } from "react-router-dom";
import { AuthService } from "../../../services/auth/auth.service";
import { getUser } from "../../../services/auth/auth.helper";
import { taskSlice } from "../../../hooks/reducers/taskSlice";
import { useAppDispatch } from "../../../hooks/redux";
import gsap from "gsap";

const Auth: React.FC = () => {
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const { pushCurrentUser } = taskSlice.actions;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const loginClick = async () => {
    const data = { login, password };

    await AuthService.login(data)
      .catch((e) => console.log(e))
      .then(async () => {
        dispatch(pushCurrentUser(await getUser()));
        await isLogged();
      });
  };
  const isLogged = async () => {
    if (Object.keys(await getUser().then((res) => res)).length !== 0) {
      const credentials = await getUser();

      console.log(`/workspace/${+credentials.id}`);

      dispatch(pushCurrentUser(await getUser()));
      return navigate(`/workspace/${+credentials.id}`);
    }
  };
  useEffect(() => {
    isLogged();
  }, []);
  useLayoutEffect(() => {
    gsap.fromTo(".auth-form", { opacity: 0, x: -50 }, { opacity: 1, x: 0 })
    gsap.fromTo(".auth-info", { y: 100}, { y: 0 });
  }, []);

  return (
    <div className="auth">
      <div className="auth-info">
        <div className="info-area">
          <p className="info-text">Welcome to TypeScript Todo</p>
          <p className="info-text info-ghost">Welcome to TypeScriptTodo</p>
        </div>
        <div className="auth-features"></div>
      </div>

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
