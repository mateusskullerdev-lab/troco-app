import "./CalcBox.css";
import { useState } from "react";

function CalcBox() {
  const [valorPagoCent, setValorPagoCent] = useState(0);
  const [valorDaCompraCent, setValorDaCompraCent] = useState(0);

  // Função limpa apenas para extrair os centavos do texto digitado
  const extrairCentavos = (texto: string): number => {
    const apenasNumeros = texto.replace(/\D/g, "");
    return apenasNumeros === "" ? 0 : parseInt(apenasNumeros, 10);
  };

  const formatarMoeda = (valorEmCentavos: number) => {
    return (valorEmCentavos / 100).toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="flex flex-col m-2">
      <label className="flex justify-center text-white">
        Digite o valor pago pelo cliente
      </label>
      <input
        type="text" /* <--- Corrigido de "number" para "text" */
        inputMode="numeric"
        className="bg-white m-1 rounded-xl p-1 text-center text-lg font-bold text-gray-800"
        value={formatarMoeda(valorPagoCent)}
        onChange={(e) =>
          setValorPagoCent(extrairCentavos(e.target.value))
        } /* <--- Estado 1 */
      />

      <label className="flex justify-center text-white mt-2">
        Digite o valor da compra
      </label>
      <input
        type="text" /* <--- Corrigido de "number" para "text" */
        inputMode="numeric"
        className="bg-white m-1 rounded-xl p-1 text-center text-lg font-bold text-gray-800"
        value={formatarMoeda(valorDaCompraCent)}
        onChange={(e) =>
          setValorDaCompraCent(extrairCentavos(e.target.value))
        } /* <--- Estado 2 */
      />

      <button
        className="bg-green-600 text-white font-bold rounded-xl ml-3 mr-3 mt-4 p-3 shadow-lg active:scale-95 transition"
        onClick={() => {
          console.log("Pago (centavos):", valorPagoCent);
          console.log("Compra (centavos):", valorDaCompraCent);
          // Aqui você chamará o invoke('calcular', ...) do Tauri!
        }}
      >
        Calcular
      </button>
    </div>
  );
}

export default CalcBox;
