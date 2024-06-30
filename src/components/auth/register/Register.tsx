import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import HeaderForm from "../../UI/HeaderForm";

import './Register.scss'
import { AuthService } from "../../../services/auth/auth.service";
import { useAppDispatch } from "../../../hooks/redux";
import { taskSlice } from "../../../hooks/reducers/taskSlice";
import { getUser } from "../../../services/auth/auth.helper";

const Register = () => {
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [login, setLogin] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const { pushCurrentUser } = taskSlice.actions
  const dispatch = useAppDispatch();
  const navigate = useNavigate()
  
  const handleClick = async () => {
    const data = {
      first_name: firstName,
      last_name: lastName,
      login,
      email,
      password
    }

    await AuthService.register(data)

    if(Object.keys(await getUser().then((res) => res)).length !== 0) {
      const credentials = await getUser()

      dispatch(pushCurrentUser(await getUser()));

      console.log(credentials)

      return navigate(`/workspace/${credentials.id}`)
    }
  }

  return (
    <div className="register">
      <div className="auth-info">
        <div className="info-area">
          <p className="info-text">Welcome to TypeScript Todo</p>
          <p className="info-text info-ghost">Welcome to TypeScriptTodo</p>
        </div>
        <div className="auth-features"></div>
      </div>
      
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
              onClick={() => handleClick()}
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
