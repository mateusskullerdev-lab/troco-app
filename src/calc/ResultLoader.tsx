import { trocoObjetoProps } from "../App";
import "./ResultLoader.css";
import formatarMoeda from "../utils/formatarMoedas";
const imagens = import.meta.glob("../assets/*.{png,jpg}", {
  eager: true,
  as: "url",
}) as Record<string, string>;

interface listTrocoProp {
  isActive: boolean;
  objetoTroco: trocoObjetoProps | null;
  onReset: () => void;
}

function ResultLoader({ isActive, objetoTroco, onReset }: listTrocoProp) {
  if (!isActive || !objetoTroco) {
    return null;
  }

  function getImagem(
    denominacao: trocoObjetoProps["itens"][number]["denominacao"],
  ) {
    const nomeArquivoBase = denominacao.nome;
    const candidatos = denominacao.eh_moeda
      ? [`${nomeArquivoBase}.png`, `${nomeArquivoBase}.jpg`]
      : [`${nomeArquivoBase}.jpg`, `${nomeArquivoBase}.png`];

    return (
      candidatos
        .map((nomeArquivo) => imagens[`../assets/${nomeArquivo}`])
        .find((caminho) => Boolean(caminho)) ?? ""
    );
  }

  return (
    <section className="result-loader">
      <p className="valor-total">{formatarMoeda(objetoTroco.valor_do_troco)}</p>
      {objetoTroco.itens
        .filter((item) => item.quantidade > 0)
        .map((item) => {
          const imagem = getImagem(item.denominacao);

          if (!imagem) {
            return null;
          }

          return (
            <div
              key={`${item.denominacao.nome}-${item.quantidade}`}
              className="result-item"
            >
              <img
                src={imagem}
                alt={item.denominacao.nome}
                className="result-image"
              />
              <span className="result-quantity">{item.quantidade}</span>
            </div>
          );
        })}
      <button className="voltar-btn" onClick={onReset}>Voltar</button>
    </section>
  );
}

export default ResultLoader;
