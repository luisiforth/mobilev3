import { ActivityIndicator, Alert } from 'react-native';
import { useQuery } from 'react-query';

import useRealmCrud from '@/hooks/useCrud';
import { useNetInfo } from '@/hooks/useNetInfo';
import ChangeReferenceProductLayout from '@/screens/change-reference-product';
import { useLocalSearchParams } from 'expo-router';

export default function RefChanges() {
  const { ref } = useLocalSearchParams();

  return (
    <>
      <ChangeReferenceProductLayout typeRoute={ref} />
    </>
  );
}
