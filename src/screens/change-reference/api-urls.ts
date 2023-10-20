export function getChangeReferenceURL(unit: number, line: number) {
  return `/v1/util/producao/${unit}/${line}` as const;
}
