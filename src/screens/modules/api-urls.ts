export function getUnitAll(user: number) {
  return `v1/unidade/usuario/${user}` as const;
}

export function getLineAll(user: number, unit: number) {
  return `v1/linha/usuario/${user}/${unit}` as const;
}

export function getDefectAll(user: number, unit: number) {
  return `v1/defeito/usuario/${user}/${unit}` as const;
}
