import { useState } from 'react';
import { TouchableOpacity } from 'react-native';

import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Stack, router } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useTheme } from 'styled-components/native';
export default function HomeLayout() {
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
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={35}
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" color={'black'} size={25} />
            </TouchableOpacity>
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
            <TouchableOpacity
              activeOpacity={1}
              hitSlop={35}
              onPress={() => router.back()}
            >
              <Feather name="arrow-left" color={'black'} size={25} />
            </TouchableOpacity>
          ),
          title: 'Escolha a Referência',
        }}
      />
    </Stack>
  );
}
