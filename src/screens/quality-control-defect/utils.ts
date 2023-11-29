import { api } from 'util/axios/axios';

import { TItem, TProduct, TSelect } from './types';

export async function getDefectRectify(
  unit: number | undefined,
  line: number | undefined
) {
  const res = await api.get<TItem[]>(`v3/retifica/defeito/${unit}/${line}`);

  return res.data;
}

export async function getAllProducts(unit: number | undefined) {
  const res = await api.get<TProduct[]>(`v3/util/fichaprod/ativo/${unit}`);
  return res.data;
}

export async function getAllDefects() {
  const res = await api.get<TSelect[]>(`v3/util/defeito/ativo/`);

  return res.data;
}
// export async function putSituation(id: number) {
//   const res = await api.put<TSelect[]>(`v3/retifica/defeito/${id}`);

//   return res.data;
// }
