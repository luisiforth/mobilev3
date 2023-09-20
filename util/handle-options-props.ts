export function addLabelAndValue<T, K extends keyof T>(
  data: T[],
  label: K,
  value: K
) {
  return data.map((itemData: T) => ({
    label: itemData[label],
    value: itemData[value],
    ...itemData,
  }));
}
