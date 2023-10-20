import { ActivityIndicator, Alert } from 'react-native';
import { useQuery } from 'react-query';

import useRealmCrud from '@/hooks/useCrud';
import { useNetInfo } from '@/hooks/useNetInfo';
import AdvancedPieceCepLayout from '@/screens/advanced-piece/advanced-piece-cep';
import { useLocalSearchParams, useNavigation } from 'expo-router';
import { api } from 'util/axios/axios';
import { Historic_advanced_piece } from 'util/realm/schema/historic_advanced_piece';
import { enableFreeze } from 'react-native-screens';

export default function CepAdvenced() {
  const { cep } = useLocalSearchParams();
  const isConnected = useNetInfo();
  const navigate = useNavigation();
  const { findById } = useRealmCrud(
    'historic_advanced_piece',
    //@ts-ignore
    Historic_advanced_piece.generate
  );
  const { data, isLoading } = useQuery(['query_piece'], async () => {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{4}-[0-9a-fA-F]{12}$/;
    const isUID = uuidRegex.test(cep as string);
    if (!isConnected && isUID) {
      const data_find = findById(cep as string);
      return data_find;
    }

    try {
      if (isUID) return findById(cep as string);
      const request = await api.get(`v3/cq/peca-adiantada/${cep}`);
      if (!request.data) return navigate.goBack();

      return await request.data;
    } catch (error: any) {
      Alert.alert(
        'Ocorreu um erro no envio',
        `Contacte um administrador e informe o erro: ${error.message}.`
      );
      return navigate.goBack();
    }
  });

  return (
    <>
      {isLoading ? (
        <ActivityIndicator />
      ) : (
        <>
          <AdvancedPieceCepLayout data={data} />
        </>
      )}
    </>
  );
}
