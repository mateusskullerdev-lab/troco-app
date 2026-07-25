import { trocoObjetoProps } from "../App";

interface listTrocoProp {
  isActive: boolean;
  objetoTroco: trocoObjetoProps | null;
}

function ResultLoader({ isActive, objetoTroco }: listTrocoProp) {
  if (!isActive || !objetoTroco) {
    return null;
  }

  const lista = objetoTroco.itens;
  for (const item of lista) {
    console.log(item.denominacao);
  }

  return <></>;
}

export default ResultLoader;
