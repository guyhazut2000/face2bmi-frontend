import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Result from "./pages/Result";
import Home from "./pages/Home";
import "./App.css";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route path="/result" element={<Result />} />
      </Routes>
    </Router>
  );
}
