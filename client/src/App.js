import "./App.css";
import React from "react";
import Login from "./routes/Login";
import Home from "./routes/Home";
import Drinks from "./routes/Drinks";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Logout from "./routes/Logout";
import User from "./routes/User";

const App = () => {
  return (
    <div className="content">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/drinks" element={<Drinks />} />
          <Route path="/user" element={<User />} />
          <Route path="/logout" element={<Logout />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
