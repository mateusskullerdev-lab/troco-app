import CalcBox from "./calc/CalcBox";
import "./App.css";
import { useState } from "react";
import ResultLoader from "./calc/ResultLoader";
import { ResetProvider } from "./ResetContext";

interface Denominacao {
  valor_em_centavos: number;
  nome: string;
  eh_moeda: boolean;
}

interface ItemCaixaProps {
  denominacao: Denominacao;
  quantidade: number;
}

export interface trocoObjetoProps {
  itens: ItemCaixaProps[];
  valor_do_troco: number;
}

function App() {
  // STATES
  const [isCalcActive, setIsCalcActive] = useState(true);
  const [trocoList, setTrocoList] = useState<trocoObjetoProps | null>(null);

  function resetAll() {
    setIsCalcActive(true);
    setTrocoList(null);
  }

  function getSonList(list: trocoObjetoProps) {
    setTrocoList(list);
    handleCalcClose();
  }

  function handleCalcClose() {
    setIsCalcActive(false);
  }

  return (
    <ResetProvider>
      <main className="container mt-10">
        <h1 className="title ">Calculadora de troco</h1>
        <CalcBox isActive={isCalcActive} handleCalc={getSonList}  />
        <ResultLoader isActive={!isCalcActive} objetoTroco={trocoList} onReset={resetAll} />
      </main>
    </ResetProvider>
  );
}

export default App;
