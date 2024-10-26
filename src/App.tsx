// import { BrowserRouter as Router } from "react-router-dom";
import { useEffect } from "react";
import "./App.css";
import Router from "./Router";
import { initializeUser } from "./utils/initAuth";

function App() {

  useEffect(() => {
    initializeUser();
  },[])

  return (
      <Router />
  );
}

export default App;