import CustomDrawer from '@/components/CustomDrawer';
import { Feather } from '@expo/vector-icons';
import { Drawer } from 'expo-router/drawer';
import { useTheme } from 'styled-components/native';

export default function HomeLayout() {
  const theme = useTheme();
  return (
    <Drawer
      drawerContent={CustomDrawer}
      screenOptions={{
        drawerActiveTintColor: theme.colors.black,
        freezeOnBlur: true,
        headerShown: false,
        sceneContainerStyle: {
          backgroundColor: theme.colors.gray[200],
        },
      }}
    >
      <Drawer.Screen
        name="modules"
        options={{
          drawerIcon: ({ color, size }) => (
            <Feather name="airplay" color={color} size={size} />
          ),
          title: 'Módulos',
          unmountOnBlur: true,
        }}
      />
      <Drawer.Screen
        options={{ drawerItemStyle: { display: 'none' }, unmountOnBlur: true }}
        name="(pieces)"
      />
      <Drawer.Screen
        options={{ drawerItemStyle: { display: 'none' }, unmountOnBlur: true }}
        name="(stop)"
      />
      <Drawer.Screen
        options={{ drawerItemStyle: { display: 'none' }, unmountOnBlur: true }}
        name="(change-reference)"
      />
      <Drawer.Screen
        options={{ drawerItemStyle: { display: 'none' }, unmountOnBlur: true }}
        name="(control-quality-defect)"
      />
    </Drawer>
  );
}
