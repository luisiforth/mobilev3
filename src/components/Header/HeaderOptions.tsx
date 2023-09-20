import React from 'react';
import { TouchableOpacity } from 'react-native';

import { useModalContext } from '@/hooks/modalOpenContext';
import { Feather } from '@expo/vector-icons';
import { useDrawerStatus } from '@react-navigation/drawer';
import { NavigationProp } from '@react-navigation/native';
import { DrawerActions } from '@react-navigation/routers';
import { useNavigation } from 'expo-router/';

import theme from '@/styles/theme';

type OptionsProps = {
  type: 'menu' | 'filter';
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function MenuOption({
  navigation,
}: {
  navigation: NavigationProp<ReactNavigation.RootParamList>;
}) {
  const isDrawerOpen = useDrawerStatus() === 'open';
  const drawerIcon = isDrawerOpen ? 'x' : 'menu';

  return (
    <TouchableOpacity
      onPress={() => navigation.dispatch(DrawerActions.toggleDrawer())}
      activeOpacity={0.9}
    >
      <Feather name={drawerIcon} size={24} color={theme.colors.black} />
    </TouchableOpacity>
  );
}

function FilterOption() {
  const { toggleModal } = useModalContext();

  return (
    <TouchableOpacity onPress={toggleModal}>
      <Feather name={'sliders'} size={24} color={theme.colors.black} />
    </TouchableOpacity>
  );
}

export function HeaderOptions({ type }: OptionsProps) {
  const navigation = useNavigation();

  return (
    <>
      {type === 'menu' && <MenuOption navigation={navigation} />}
      {type === 'filter' && <FilterOption />}
    </>
  );
}
