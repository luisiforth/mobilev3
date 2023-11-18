import { Feather } from '@expo/vector-icons';
import { Stack, useNavigation } from 'expo-router';
import { useTheme } from 'styled-components/native';

export default function HomeLayout() {
  const navigation = useNavigation();

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
        name="change_reference"
        options={{
          headerLeft: () => (
            <Feather
              name="arrow-left"
              onPress={() => navigation.goBack()}
              color={'black'}
              size={25}
            />
          ),
          title: 'Troca de Referência',
        }}
      />
      <Stack.Screen
        name="reference/[ref]"
        options={{
          headerLeft: () => (
            <Feather
              name="arrow-left"
              //@ts-ignore
              onPress={() => navigation.navigate('change_reference')}
              color={'black'}
              size={25}
            />
          ),
          title: 'Escolha a Referência',
        }}
      />
    </Stack>
  );
}
