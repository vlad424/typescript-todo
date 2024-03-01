import React, { useEffect } from "react";
import LeftMenu from "./components/LeftMenu";
import RightTaskDesc from "./components/RightTaskDesc";
import Task from "./components/Task";
import { useAppSelector } from "./hooks/redux";
import Auth from "./components/auth/Auth";
import { Route, Routes, useNavigate } from "react-router-dom";

function App() {
  //local vars
  const isLogined = useAppSelector((state) => state.taskReducer.isLogined);
  //const isLoading = useAppSelector((state) => state.taskReducer.isLoading);
  
  //hooks
  const navigate = useNavigate() 

  useEffect(() => {
    isLogined ? navigate("/workspace") : console.log("")
  }, [isLogined])

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
      </Routes>
    );
  }
}

export default App;
