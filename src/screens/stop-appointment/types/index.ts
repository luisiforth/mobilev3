export type StoppedAppointmentRequest = {
  COR: number;
  IDPARADA: number;
  IDPRODUCAOEFI: number;
  IDUSUARIO: number;
  IDUNIDADE: number;
  IDLINHA: number;
  IDFICHAPROD: number;
  IDMOTIVOPARADA: number;
  DATAPARADA: string;
  HORAPARADA: string;
  DATAINIPARADA: string;
  HORAINIPARADA: string;
  DATAFIMPARADA: string;
  HORAFIMPARADA: string;
  HORASTOTALPARADA: string;
  TEMPOMINPARADA: number;
  DESCTEMPOPARADA: string;
  TIPOPARADAPARADA: number;
  OBSPARADA: string;
  SINCPARADA: number;
  FLAGPARADA: number;
  FLAGDESCPARADA: string;
  IDLINHAEQUIP: number;
  IDAUXPRODUCAOEFI: number;
  CADASTREIAQUI: string;
  LIBERADOAPONTARPARADA: number;
  IDPARADACR8: number;
  IDUSUTECATENDEUPARADA: number;
  DESCLINHA: string;
  DESCMOTIVOPARADA: string;
}[];

export type Option_equipment = { DESCLINHA: string; IDLINHA: number };

export type Option_product = { DESCFICHAPROD: string; IDFICHAPROD: number };

export type Option_type_stoppeds = {
  DESCTIPOPARADA: string;
  IDTIPOPARADA: number;
};

export type Option_reason_stopped = {
  DESCMOTIVOPARADA: string;
  IDMOTIVOPARADA: number;
};
