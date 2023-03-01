import React from "react";
import "./App.css";
import Login from "./ChatApp/Login/Login";
import  ChatApp  from "./ChatApp/ChatApp";
import  StartPage  from "./StartPage/StartPage";
import  { Routes, Route }  from "react-router-dom";
import  Navbar  from "./Navbar/NavBar";
import  Laufen  from "./Laufen/Laufen";
import   Finanzen  from "./Finanzen/Finanzen";

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path="/Login" element={<Login />}/>
        <Route path="/Chat" element={<ChatApp />} />
        <Route path="/startpage" element={<StartPage />} />
        <Route path="/Laufen" element={<Laufen />}/>
        <Route path="/Finanzen" element={<Finanzen />}/>
      </Routes>
    </div>
  );
}

export default App;
 