import { useSafeAreaInsets } from 'react-native-safe-area-context';

import CustomDrawer from '@/components/CustomDrawer';
import { COLORS } from '@/constants';
import { Feather } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';

import theme from '@/styles/theme';

export default function HomeLayout() {
  const insets = useSafeAreaInsets();

  return (
    <Drawer
      drawerContent={CustomDrawer}
      initialRouteName="home/index"
      screenOptions={{
        drawerActiveTintColor: theme.colors.black,
        headerShown: false,
        sceneContainerStyle: {
          backgroundColor: COLORS.white,
          paddingTop: insets.top,
        },
      }}
    >
      <Drawer.Screen
        name="modules/index"
        options={{
          title: 'Modulos',
          drawerIcon: ({ color, size }) => (
            <Feather name="airplay" color={color} size={size} />
          ),
        }}
      />
      {/* <Drawer.Screen name="teste/index" /> */}
      <Drawer.Screen
        name="teste/index"
        options={{
          title: 'Dashboard',
          drawerIcon: ({ color, size }) => (
            <Feather name="send" color={color} size={size} />
          ),
        }}
      />
      {/* <Drawer.Screen name="index" /> */}
    </Drawer>
  );
}
