// App.js
import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "./views/Login";
import Landing from "./views/Landing"; // Assuming you have a Home component
import Home from "./views/Home";
import NewLoan from "./views/NewLoan";
import Signup from "./views/Signup";
import Header from "./components/Header";
import LoanApplication from "./views/LoanApplication";
import AuthLayout from "./layout/AuthLayout";
import InterestPage from "./views/InterestPage";

function App() {
  return (
    <div className="App">
      <Header />
      <div style={{ marginTop: "70px", height: "calc(100vh - 70px)" }}>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<AuthLayout />}>
            <Route path="/home" element={<Home />} />
            <Route path="/loan/:id" element={<LoanApplication />} />
            <Route path="/newloan" element={<NewLoan />} />
            <Route path="/interest/:id" element={<InterestPage />} />
          </Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
