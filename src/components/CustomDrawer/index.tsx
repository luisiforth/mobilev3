import { useCallback } from 'react';
import { Alert, Text, View } from 'react-native';
import { TouchableOpacity } from 'react-native';

import { useCredentialStore } from '@/store/filterStore';
import { Feather } from '@expo/vector-icons';
import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import { Link } from 'expo-router';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

export default function CustomDrawer(props: DrawerContentComponentProps) {
  const theme = useTheme();
  const { setUser } = useCredentialStore();
  function handlePress() {
    setUser({ userid: null, username: null });
    // setFilter();
    //@ts-ignore
    // return navigation.navigate('/index');
  }

  const handleAttAlert = useCallback(() => {
    Alert.alert('Atualização', 'Versão: 2 \n TESTE TESTE');
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
        <Link href={'/'} onPress={handlePress} asChild>
          <View
            style={{
              alignItems: 'center',
            }}
          >
            <Feather name={'log-out'} size={20} color={theme.colors.black} />
            <Text> Sair </Text>
          </View>
        </Link>
      </S.Root.Footer>
    </S.Root.Wrapper>
  );
}
