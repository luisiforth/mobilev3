import { useState } from 'react';

import { Feather } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { Stack, useNavigation } from 'expo-router';
import * as ScreenOrientation from 'expo-screen-orientation';
import { useTheme } from 'styled-components/native';

export default function HomeLayout() {
  const [isPortrait, setIsPortrait] = useState(false);
  const navigation = useNavigation();
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
        name="controlDefects"
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
          title: 'Controle de qualidade e defeitos',
        }}
      />
    </Stack>
  );
}
