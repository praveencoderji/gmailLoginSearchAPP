import "./App.css";
import { useEffect, useState}  from "react";
import { BrowserRouter as Router, Routes, Route, Navigat  } from "react-router-dom";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Search from "./Components/Search";
import Dashboard from "./Components/Dashboard";

function App() {

  return (
    <Router>
      { localStorage.getItem("accessToken") && <Navbar/>}
      <Routes>
        <Route path="/" exact element={localStorage.getItem("accessToken") ? <Dashboard/> : <Login/>} />
        <Route path="/search" element={localStorage.getItem("accessToken") ? <Search/> : <Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
