import { useEffect, useState } from 'react';

import { api } from 'util/axios/axios';
import { addLabelAndValue } from 'util/handle-options-props';

type TSelect = {
  ID: number;
  DESCRICAO: string;
};

export async function getAllDefects(page: number, limit = 10) {
  const res = await api.get<TSelect[]>(
    `v3/util/defeito/ativo?page=${page}&limit=${limit}`,
    {
      headers: {
        'X-Paginate': true,
      },
    }
  );
  return res.data.docs;
}

export default function useInfiniteScroll() {
  const [data, setData] = useState<TSelect[]>([]);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setLoading(true);
    setError(false);

    getAllDefects(page)
      .then((data) => {
        const optionProd = data
          ? addLabelAndValue(data, 'DESCRICAO', 'ID')
          : [];
        setData((prev) => [...prev, ...optionProd]);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setError(true);
        setLoading(false);
      });
  }, [page]);

  function nextPage() {
    if (loading) return;
    console.log('teste');
    setPage((prev) => prev + 1);
  }

  return { data, loading, error, nextPage };
}
