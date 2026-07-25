use crate::calc::models::ItemTroco;

use super::super::CalcError;
use super::models::{Denominacao, Resultado, TransacaoValores};
pub fn calcular_troco(
    valores: TransacaoValores,
    cedulas_disponiveis: Vec<Denominacao>,
) -> Result<Resultado, CalcError> {
    if valores.valor_para_pagar > valores.valor_pago {
        return Err(CalcError::ValorInsuficiente);
    };
    let mut itens = Vec::new();
    let mut resto = valores.valor_pago - valores.valor_para_pagar;
    let troco_total = resto;
    for i in cedulas_disponiveis {
        if resto == 0 {
            break;
        }
        let quantidade = resto / i.valor_em_centavos;
        if quantidade > 0 {
            itens.push(ItemTroco {
                denominacao: i.clone(),
                quantidade,
            });
            resto %= i.valor_em_centavos;
        }
    }
    Ok(Resultado {
        valor_do_troco: troco_total,
        itens,
    })
}
#[tauri::command(rename_all = "snake_case")]
pub fn calcular(valor_total: u32, valor_recebido: u32) -> Result<Resultado, String> {
    // Lista padrão do Real Brasileiro (em centavos)
    let moedas_e_notas = vec![
        Denominacao {
            valor_em_centavos: 10000,
            nome: "100".into(),
            eh_moeda: false,
        },
        Denominacao {
            valor_em_centavos: 5000,
            nome: "50".into(),
            eh_moeda: false,
        },
        Denominacao {
            valor_em_centavos: 2000,
            nome: "20".into(),
            eh_moeda: false,
        },
        Denominacao {
            valor_em_centavos: 1000,
            nome: "10".into(),
            eh_moeda: false,
        },
        Denominacao {
            valor_em_centavos: 500,
            nome: "5".into(),
            eh_moeda: false,
        },
        Denominacao {
            valor_em_centavos: 200,
            nome: "2".into(),
            eh_moeda: false,
        },
        Denominacao {
            valor_em_centavos: 100,
            nome: "1".into(),
            eh_moeda: true,
        },
        Denominacao {
            valor_em_centavos: 50,
            nome: "0.50".into(),
            eh_moeda: true,
        },
        Denominacao {
            valor_em_centavos: 25,
            nome: "0.25".into(),
            eh_moeda: true,
        },
        Denominacao {
            valor_em_centavos: 10,
            nome: "0.10".into(),
            eh_moeda: true,
        },
        Denominacao {
            valor_em_centavos: 5,
            nome: "0.05".into(),
            eh_moeda: true,
        },
    ];

    let input = TransacaoValores {
        valor_para_pagar: valor_total,
        valor_pago: valor_recebido,
    };

    match calcular_troco(input, moedas_e_notas) {
        Ok(resultado) => Ok(resultado),
        Err(CalcError::ValorInsuficiente) => Err("Valor recebido é insuficiente".to_string()),
        Err(_) => Err("Ocorreu um erro".to_string()),
    }
}

#[cfg(test)]
mod tests {
    use super::*;
    #[test]
    fn test_troco() {
        let valor_total = 6400;
        let valor_recebido = 10000;
        let res = calcular(valor_total, valor_recebido).unwrap();
        assert_eq!(res.valor_do_troco, 3600);
    }
}
