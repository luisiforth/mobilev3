export function postAdvPiece() {
  return `v3/cq/peca-adiantada` as const;
}

export function getAdvPiece(unit: number, line: number) {
  return `v3/cq/peca-adiantada/${unit}/${line}` as const;
}
