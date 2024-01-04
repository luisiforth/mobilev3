import { TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import { useTheme } from 'styled-components/native';

export default function HomeLayout() {
  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
        animation: 'slide_from_right',
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
        headerShadowVisible: false,
        headerStyle: { backgroundColor: theme.colors.background },
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen
        name="pieces"
        options={{
          headerLeft: () => (
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={35}
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" color={'black'} size={25} />
            </TouchableOpacity>
          ),

          title: 'Peça Adiantada',
        }}
      />
      <Stack.Screen
        name="cep/[cep]"
        options={{
          headerLeft: () => (
            <Feather
              name="arrow-left"
              onPress={() => router.back()}
              color={'black'}
              size={25}
            />
          ),
          title: '',
        }}
      />
    </Stack>
  );
}
