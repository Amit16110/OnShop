import React, { useEffect } from "react";
import { Switch, Route } from "react-router-dom";
import Home from "./Components/Home/Home";
import Login from "./Components/Auth/Login";
import Register from "./Components/Auth/Register";
import Header from "./Components/Header/Header";
import RegisterComplete from "./Components/Auth/RegisterComplete";

import { auth } from "./firebase";
import { useDispatch } from "react-redux";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    // access the current user
    const unsubscribe = auth.onAuthStateChanged(
      // if user in not login it has show undefined.
      async (user) => {
        if (user) {
          const idTokenResult = await user.getIdTokenResult();
          console.log("user", user);
          // this is use for backend for protecting route
          dispatch({
            type: "LOGGED_IN_USER",
            payload: {
              Email: user.email,
              token: idTokenResult.token,
            },
          });
        }
      }
    );
  }, []);
  return (
    <>
      <Header />
      <ToastContainer />
      <Switch>
        <Route path="/registerComplete" component={RegisterComplete} />
        <Route path="/register" component={Register} />
        <Route path="/login" component={Login} />
        <Route path="/" component={Home} />
      </Switch>
    </>
  );
};

export default App;
