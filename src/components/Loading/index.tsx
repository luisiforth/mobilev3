import { ActivityIndicator, Text, View } from 'react-native';

import { useTheme } from 'styled-components/native';

import * as S from './styles';

export default function Loading() {
  const theme = useTheme();
  return (
    <View
      style={{
        alignItems: 'center',
        gap: 10,
      }}
    >
      <ActivityIndicator color={theme.colors.primary[300]} size={40} />
      <Text>Carregando...</Text>
    </View>
  );
}
