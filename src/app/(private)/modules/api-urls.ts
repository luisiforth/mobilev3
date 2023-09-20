export function getUnitAll(user: string) {
  return `v1/unidade/usuario/${user}` as const;
}

export function getLineAll(user: string, unit: number) {
  return `v1/linha/usuario/${user}/${unit}` as const;
}
