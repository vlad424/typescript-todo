import React from "react";
import LeftMenu from "./components/LeftMenu";
import RightTaskDesc from "./components/RightTaskDesc";
import Task from "./components/Task";
import { useAppSelector } from "./hooks/redux";
import Auth from "./components/auth/login/Auth";
import { Route, Routes } from "react-router-dom";
import ForgotPass from "./components/auth/forgot/ForgotPass";
import Register from "./components/auth/register/Register";

function App() {
  //local vars
  const isLogined = useAppSelector((state) => state.taskReducer.isLogined);
  //const isLoading = useAppSelector((state) => state.taskReducer.isLoading);

  if (isLogined === true) {
    return (
      <Routes>
        <Route
          path="/workspace"
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
