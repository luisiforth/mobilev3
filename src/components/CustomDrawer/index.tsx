import { useCallback } from 'react';
import { Alert, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { useAuth } from '@/hooks/useAuth';
import { useCredentialStore } from '@/store/filterStore';
import { Feather } from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const theme = useTheme();
  const { signOut } = useAuth();

  const handleAttAlert = useCallback(() => {
    Alert.alert('Atualização', 'Versão: 2 \n TESTE TESTE');
  }, []);

  const handleSignOut = useCallback(async () => {
    Alert.alert('Sair', 'Deseja sair da aplicação ?', [
      {
        text: 'Cancelar',
        style: 'cancel',
      },
      {
        text: 'Sair',
        onPress: signOut,
      },
    ]);
  }, []);

  return (
    <S.Root.Wrapper>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>
      <S.Root.Footer>
        <TouchableOpacity
          hitSlop={5}
          onPress={handleAttAlert}
          style={{
            alignItems: 'center',
          }}
        >
          <Feather name={'alert-circle'} size={20} color={theme.colors.black} />
          <Text> Atualizações </Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={handleSignOut}>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Feather name={'log-out'} size={20} color={theme.colors.black} />
            <Text> Sair </Text>
          </View>
        </TouchableOpacity>
      </S.Root.Footer>
    </S.Root.Wrapper>
  );
}
