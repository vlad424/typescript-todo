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
import ListPage from "./pages/ListPage/ListPage";
import ListMain from "./pages/ListMain/ListMain";

function App() {
  //local vars
  const isLogined = useAppSelector((state) => state.taskReducer.isLogined);
  let userR = useAppSelector(state => state.taskReducer.User)

  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const [indentUser, setIndentUser] = useState(0)

  const { pushCurrentUser } = taskSlice.actions

  const isLogged = async () => {
    if(Object.keys(await getUser().then((res) => res)).length !== 0) {
      
      const user = await getUser()
      userR = user

      dispatch(pushCurrentUser(user));
      setIndentUser(indentUser => indentUser = user.id)
    }
  };

  useEffect(() => {
    isLogged();
  }, [isLogined])

  if (isLogined === true) {
    if(userR!.role === 'admin') {
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
          <Route
            path={`/workspace/${indentUser}/admin`}
            element = {
            <main className="App">
              <ListPage/>
              <ListMain/>
            </main>
            }
          />
          <Route
          path="/"
          element={
            <main className="App">
              <Auth />
            </main>
          }
        />
        </Routes>
      ); 
    }
    else {
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
          <Route
          path="/"
          element={
            <main className="App">
              <Auth />
            </main>
          }
        />
        </Routes>
      ); 
    }
  } 
  else {
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