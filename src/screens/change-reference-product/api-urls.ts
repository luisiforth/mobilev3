export function getChangeProductInReferenceURL(unit: number, line: number) {
  return `/v1/pcp/troca/referencia/plano/producao/${unit}/${line}` as const;
}

interface PutProductInReferenceURLProps {
  unit: number;
  line: number;
  idpcp: number;
  type: number;
}

export function putProductInReferenceURL(props: PutProductInReferenceURLProps) {
  const { unit, line, idpcp, type } = props;
  return `/v1/pcp/plano/producao/inicia/${unit}/${line}/${idpcp}/${type}` as const;
}

interface PostProductInReferenceURLProps {
  unit: number;
  line: number;
  idUser: number;
  idProduct: number;
  idFormat: number;
}
export function postProductInReferenceURL(
  props: PostProductInReferenceURLProps
) {
  const { unit, line, idUser, idProduct, idFormat } = props;
  return `/v1/pcp/adiciona/producao/${unit}/${line}/${idUser}/${idProduct}/${idFormat}` as const;
}
