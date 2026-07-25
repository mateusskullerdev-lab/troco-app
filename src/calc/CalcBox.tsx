import { invoke } from "@tauri-apps/api/core";
import "./CalcBox.css";
import { useState } from "react";
import formatarMoeda from "../utils/formatarMoedas";
interface CalcBoxProps {
  isActive: boolean;
  handleCalc: (res: any) => void;
}

function CalcBox({ isActive, handleCalc }: CalcBoxProps) {
  const [valorPagoCent, setValorPagoCent] = useState(0);
  const [valorDaCompraCent, setValorDaCompraCent] = useState(0);

  const extrairCentavos = (texto: string): number => {
    const apenasNumeros = texto.replace(/\D/g, "");
    return apenasNumeros === "" ? 0 : parseInt(apenasNumeros, 10);
  };

  if (!isActive) {
    return null;
  }
  return (
    <div className="flex flex-col m-2">
      <label className="flex justify-center text-white">
        Digite o valor pago pelo cliente
      </label>
      <input
        type="text"
        inputMode="numeric"
        className="bg-white m-1 rounded-xl p-1 text-center text-lg font-bold text-gray-800"
        value={formatarMoeda(valorPagoCent)}
        onChange={(e) => setValorPagoCent(extrairCentavos(e.target.value))}
      />

      <label className="flex justify-center text-white mt-2">
        Digite o valor da compra
      </label>
      <input
        type="text"
        inputMode="numeric"
        className="bg-white m-1 rounded-xl p-1 text-center text-lg font-bold text-gray-800"
        value={formatarMoeda(valorDaCompraCent)}
        onChange={(e) => setValorDaCompraCent(extrairCentavos(e.target.value))}
      />

      <button
        className="bg-green-600 text-white font-bold rounded-xl ml-3 mr-3 mt-4 p-3 shadow-lg active:scale-95 transition"
        onClick={async () => {
          console.log("Pago (centavos):", valorPagoCent);
          console.log("Compra (centavos):", valorDaCompraCent);
          try {
            let res = await invoke("calcular", {
              valor_total: valorDaCompraCent,
              valor_recebido: valorPagoCent,
            });
            handleCalc(res);
            console.log(res);
            setValorDaCompraCent(0)
            setValorPagoCent(0)
          } catch (error) {
            alert("Valor recebido é insuficiente para pagar a compra" + error);
          }
        }}
      >
        Calcular
      </button>
    </div>
  );
}

export default CalcBox;
