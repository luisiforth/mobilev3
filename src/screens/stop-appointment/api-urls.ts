export function getAllDataURL(
  unit: number,
  line: number,
  initialDate: string,
  finalDate: string,
  maxRegister: number
) {
  return `/v1/util/parada/${unit}/${line}/${initialDate}/${finalDate}/${maxRegister}` as const;
}

export function putCancelURL(dataId: number) {
  return `v1/util/parada/${dataId}` as const;
}

export function getLinesURL(line: number) {
  return `/v1/linha/sub/${line}` as const;
}

export function getProductURL(unit: number, search = '') {
  return `/v1/util/consulta/produto/${unit}/false/${search}` as const;
}

export function getTypeStoppedsURL() {
  return `/v1/util/tipo/parada/ativo` as const;
}

export function getWhySoppedURL(type: number) {
  return `/v1/util/motivo/tipo/parada/${type}` as const;
}

export function postDataURL() {
  return `/v1/util/parada/` as const;
}
