import { Alert } from 'react-native';

import { api } from 'util/axios/axios';
import { GenerateAdvancedPieceProps } from 'util/realm/schema/historic_advanced_piece';

export async function handle_post(
  data: (GenerateAdvancedPieceProps & { _id: string }) | null,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  deleteRecord: (value: any) => any
) {
  const result = await api.post(`v3/cq/peca-adiantada`, data);
  if (result.status == 200) {
    deleteRecord;
    return Alert.alert('', 'Dado enviado com sucesso!');
  }

  return Alert.alert('Falha', 'Dado não enviado, tente novamente mais tarde!');
}
