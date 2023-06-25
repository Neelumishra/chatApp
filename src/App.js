import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Join from "./components/Join/Join";
import { useState } from "react";
import Chat from "./components/chat";

function App() {
  const [value,setValue] =useState("")
  function name(e){
    console.log(value)
    setValue(e.target.value)
  }
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route exact path="/" element={<Join name={name} value={value} />} />
          <Route path="/chat" element={<Chat value={value} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
