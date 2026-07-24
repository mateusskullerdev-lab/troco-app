use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Denominacao {
    pub valor_em_centavos: u32,
    pub nome: String,
    pub eh_moeda: bool,
}

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct ItemTroco {
    pub denominacao: Denominacao,
    pub quantidade: u32,
}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct TransacaoValores {
    pub valor_para_pagar: u32,
    pub valor_pago: u32,
}
#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct Resultado {
    pub valor_do_troco: u32,
    pub itens: Vec<ItemTroco>,
}

