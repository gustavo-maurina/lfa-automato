import { ChangeEvent, useRef, useState } from "react";
import reactLogo from "./assets/react.svg";
import "./App.css";
import { verificarPertencimento } from "./utils/verificarPertencimentos";
import { Button } from "./components/Button";
import { AutomatoForm } from "./components/AutomatoForm";
import { EntradaForm } from "./components/EntradaForm";
import { Automato } from "./types/Automato";

function App() {
  const [automato, setAutomato] = useState<Automato>();

  return (
    <div className="app">
      <AutomatoForm setAutomato={setAutomato} />
      {automato && <EntradaForm automato={automato}/>}
    </div>
  );
}

export default App;
