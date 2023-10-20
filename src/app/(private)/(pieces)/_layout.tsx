import { Feather } from '@expo/vector-icons';
import { Stack, useNavigation } from 'expo-router';
import { useTheme } from 'styled-components/native';

export default function HomeLayout() {
  const navigation = useNavigation();

  const theme = useTheme();
  return (
    <Stack
      screenOptions={{
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
            <Feather
              name="arrow-left"
              onPress={() => navigation.goBack()}
              color={'black'}
              size={25}
            />
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
              //@ts-ignore
              onPress={() => navigation.navigate('pieces')}
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
