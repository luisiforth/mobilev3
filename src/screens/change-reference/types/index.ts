export type ProductionLineRequest = {
  IDPROLINHA: number;
  IDUNIDADE: number;
  IDLINHA: number;
  IDUSUARIO: number;
  IDFICHAPROD: number;
  DATAINIPRODLINHA: string;
  DATAFIMPRODLINHA: string;
  HORAINIPRODLINHA: string;
  HORAFIMPRODLINHA: string;
  FLAGPRODLINHA: number;
  FLAGDESCPRODLINHA: 'PRODUCAO ENCERRADA' | 'EM PRODUCAO';
  DESFORMATO: string;
  NOMEUSU: string;
  REFFICHAPROD: number;
  QUANTFORNOPRODLINHA: number;
  MINPRODHORAPRODLINHA: number;
  DESCLINHA: string;
};
