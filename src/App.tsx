import { useState } from "react";
import CalcBox from "./calc/CalcBox";
import { invoke } from "@tauri-apps/api/core";
import "./App.css";

function App() {
  const [greetMsg, setGreetMsg] = useState("");
  const [name, setName] = useState("");

  async function greet() {
    // Learn more about Tauri commands at https://tauri.app/develop/calling-rust/
    setGreetMsg(await invoke("greet", { name }));
  }

  return (
    <main className="container mt-10">
      <h1 className="title ">Calculadora de troco</h1>
      <CalcBox />
    </main>
  );
}

export default App;
