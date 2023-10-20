import React, { useCallback } from 'react';
import { Alert, TouchableOpacity, TouchableOpacityProps } from 'react-native';

import { useNetInfo } from '@/hooks/useNetInfo';
import { useCredentialStore } from '@/store/filterStore';
import { Feather } from '@expo/vector-icons';
import { useDrawerStatus } from '@react-navigation/drawer';
import { NavigationProp } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/routers';
import { useNavigation } from 'expo-router/';
import { useTheme } from 'styled-components/native';

type OptionsProps = {
  type: 'menu' | 'filter' | 'att' | 'logout';
} & TouchableOpacityProps;

// type OptionsFilterProps = {} & TouchableOpacityProps;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MenuOption({
  navigation,
}: {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}) {
  const theme = useTheme();
  const isDrawerOpen = useDrawerStatus() === 'open';
  const drawerIcon = isDrawerOpen ? 'x' : 'menu';

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      activeOpacity={0.9}
      hitSlop={20}
    >
      <Feather name={drawerIcon} size={24} color={theme.colors.black} />
    </TouchableOpacity>
  );
}

function FilterOption({ ...props }: TouchableOpacityProps) {
  const theme = useTheme();

  return (
    <TouchableOpacity hitSlop={20} {...props}>
      <Feather name={'sliders'} size={24} color={theme.colors.black} />
    </TouchableOpacity>
  );
}

function AttOption({ ...props }: TouchableOpacityProps) {
  const theme = useTheme();
  const handleAttAlert = useCallback(() => {
    Alert.alert('Atualização', 'Versão: 2 \n TESTE TESTE');
  }, []);

  return (
    <TouchableOpacity hitSlop={5} onPress={handleAttAlert} {...props}>
      <Feather name={'alert-circle'} size={20} color={theme.colors.black} />
    </TouchableOpacity>
  );
}

function LogoutOption({
  navigation,
}: {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}) {
  const theme = useTheme();
  const { setUser } = useCredentialStore();
  function handlePress() {
    setUser({ userid: null, username: null });
    //@ts-ignore
    return navigation.navigate('index');
  }

  return (
    <TouchableOpacity
      hitSlop={5}
      onPress={handlePress}
      // {...props}
    >
      <Feather name={'log-out'} size={20} color={theme.colors.black} />
    </TouchableOpacity>
  );
}

export function HeaderOptions({ type, ...props }: OptionsProps) {
  const navigation = useNavigation();
  const isConnected = useNetInfo();

  return (
    <>
      {type === 'att' && <AttOption />}
      {type === 'logout' && <LogoutOption navigation={navigation} />}
      {type === 'menu' && <MenuOption navigation={navigation} />}
      {type === 'filter' && isConnected && <FilterOption {...props} />}
    </>
  );
}
