import React, { useEffect, useState } from "react";
import LeftMenu from "./components/LeftMenu";
import RightTaskDesc from "./components/RightTaskDesc";
import Task from "./components/Task";
import { useAppDispatch, useAppSelector } from "./hooks/redux";
import Auth from "./components/auth/login/Auth";
import { Route, Routes, useNavigate } from "react-router-dom";
import ForgotPass from "./components/auth/forgot/ForgotPass";
import Register from "./components/auth/register/Register";
import { taskSlice } from "./hooks/reducers/taskSlice";
import { getUser } from "./services/auth/auth.helper";

function App() {
  //local vars
  const isLogined = useAppSelector((state) => state.taskReducer.isLogined);
  //const isLoading = useAppSelector((state) => state.taskReducer.isLoading);

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [indentUser, setIndentUser] = useState(0)

  const { pushCurrentUser } = taskSlice.actions

  const isLogged = async () => {
    if(Object.keys(await getUser().then((res) => res)).length !== 0) {
      
      const user = await getUser()
      
      dispatch(pushCurrentUser(user));
      setIndentUser(indentUser => indentUser = user.id)

      return navigate(`/workspace/${user.id}`)
    }
  };

  useEffect(() => {
    isLogged();
  }, [isLogined])

  if (isLogined === true) {
    return (
      <Routes>
        <Route
          path={`/workspace/${indentUser}`}
          element={
            <main className="App">
              <LeftMenu />
              <Task />
              <RightTaskDesc />
            </main>
          }
        />
      </Routes>
    );
  } else {
    return (
      <Routes>
        <Route
          path="/"
          element={
            <main className="App">
              <Auth />
            </main>
          }
        />
        <Route
          path="/register"
          element={
            <main className="App">
              {" "}
              <Register />{" "}
            </main>
          }
        />
        <Route
          path="/login/access-token"
          element={<main className="App"></main>}
        />
        <Route
          path="/forgot-password"
          element={
            <main className="App">
              {" "}
              <ForgotPass />{" "}
            </main>
          }
        />
      </Routes>
    );
  }
}

export default App;
