export type TItem = {
  ID: number;
  FLAG: {
    ID: number;
    DESCRICAO: string;
  };
  DATA: string;
  HORA: string;
  QUALIDADE: number;
  AMOSTRA: number;
  INDICE: number;
  TOM: number;
  TONALIDADE: string;
  QUANTIDADE: {
    C: number;
    QUEBRA: number;
  };
  PRODUTO: {
    ID: number;
    REFERENCIA: number;
  };
  DEFEITO: {
    ID: number;
    DESCRICAO: string;
  };
  USUARIO: {
    ID: number;
    NOME: string;
  };
  TIPO: { DESCRICAO: string; ID: number };
};

export type TSelect = {
  ID: number;
  DESCRICAO: string;
};

export type TProduct = {
  ID: number;
  DESCRICAO: string;
  REFERENCIA: string;
};
