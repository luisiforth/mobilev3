import { useState } from 'react';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Stack, useNavigation } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useTheme } from 'styled-components/native';
export default function HomeLayout() {
  const navigation = useNavigation();
  const [isPortrait, setIsPortrait] = useState(false);
  async function changeScreenOrientation() {
    setIsPortrait((prev) => !prev);

    if (isPortrait)
      return await ScreenOrientation.lockAsync(
        ScreenOrientation.OrientationLock.PORTRAIT
      );

    return await ScreenOrientation.lockAsync(
      ScreenOrientation.OrientationLock.LANDSCAPE
    );
  }
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
        name="changeReference"
        options={{
          headerLeft: () => (
            <Feather
              name="arrow-left"
              onPress={() => navigation.goBack()}
              color={'black'}
              size={25}
            />
          ),
          headerRight: () => (
            <MaterialCommunityIcons
              name="phone-rotate-landscape"
              onPress={changeScreenOrientation}
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
              onPress={() => navigation.navigate('changeReference')}
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
