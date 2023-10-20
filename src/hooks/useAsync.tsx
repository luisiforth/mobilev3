import { useState } from 'react';
import { Alert } from 'react-native';

import { useDefectsStore } from '@/store/filterStore';
import { api } from 'util/axios/axios';

import { useNetInfo } from './useNetInfo';

type OptionProps = {
  DESCDEFEITO: string;
  IDDEFEITO: number;
};

const handleError = (error: Error) => {
  Alert.alert(
    'Erro',
    `Informe o erro ao administrador do sistema TELA SYNC:\n\n${error}`
  );
};

export default function useAsync() {
  const [isLoading, setLoading] = useState(true);
  const isConnected = useNetInfo();
  const { setDefect, defects } = useDefectsStore();

  const getDefects = async (unit: number) => {
    if (!isConnected && defects.length == 0) {
      return Alert.alert(
        'Cuidado',
        'Você não possui dados cadastrados, conecte-se a internet ou selecione uma unidade e linha.'
      );
    }

    if (!isConnected) {
      return;
    }

    try {
      const response = await api.get<OptionProps[]>(
        `/v1/util/defeito/${0}/${0}`
      );

      const defect = response.data.map((value) => ({
        label: value.DESCDEFEITO,
        value: value.IDDEFEITO,
      }));

      setDefect(defect);
      setLoading(false);
      return;
    } catch (error: any) {
      handleError(error);
    }
  };

  return {
    getDefects,
    isLoading,
  };
}
