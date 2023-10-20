import { useEffect, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import { Card } from '@/components/Card';
import { ControlledInput } from '@/components/ControlledInput';
import { TextInput } from '@/components/TextInput';
import { useCredentialStore } from '@/store/filterStore';
import { yupResolver } from '@hookform/resolvers/yup';
import axios from 'axios';
import { useNavigation } from 'expo-router';
import * as SecureStore from 'expo-secure-store';
import { encode } from 'js-base64';
import { api } from 'util/axios/axios';

import SVGImage from '../../../assets/icon.svg';
import { getToken } from './api-urls';
import { schema } from './schema';

import * as S from './styles';
// import { Image } from 'expo-image';

export default function LoginLayout() {
  const navigation = useNavigation();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const { setUser, credential } = useCredentialStore();
  const insets = useSafeAreaInsets();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { errors, isLoading },
  } = methods;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const login_encoded = encode(
      `${data.user.toLowerCase()}|${data.password.toLowerCase()}`
    );
    try {
      const request = await api.get(getToken(), {
        headers: { iforthsistemas: `iforth ${login_encoded}` },
      });

      if (request.status == 200) {
        await SecureStore.setItemAsync('iforthToken', request.data.TOKEN);
        const data = {
          userid: request.data.IDUSU,
          username: request.data.NOMEUSU,
        };
        setUser(data);
        //@ts-ignore
        return navigation.navigate('modules');
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        Alert.alert('Erro', `Erro: ${error.message}`);
        return console.log(error.toJSON());
      }

      Alert.alert('Erro', `Erro: ${error}`);
      return;
    }
  };

  useEffect(() => {
    if (credential?.userid != null) {
      // console.log({ credential });
      //@ts-ignore
      return navigation.navigate('modules');
    }
  }, []);

  return (
    <>
      <S.Root.WrapperIndex insets={insets}>
        {/* <SVGImage width={280} height={250} /> */}
        <Image
          style={{ width: 400, height: 300, marginTop: -10 }}
          source={require('./logo.png')}
        />
        <Card.Wrapper>
          <Card.Container>
            <TextInput.Wrapper
              required
              error={errors.user?.message}
              label="Usuário"
            >
              <TextInput.Icon disableTouch icon="user" />
              <ControlledInput
                name="user"
                autoCapitalize="none"
                control={methods.control}
                keyboardType="default"
                placeholder="Insira o seu usuário"
              />
            </TextInput.Wrapper>
            <TextInput.Wrapper
              required
              error={errors.password?.message}
              label="Senha"
            >
              <TextInput.Icon
                onPressIn={() => setIsVisiblePassword(!isVisiblePassword)}
                onPressOut={() => setIsVisiblePassword(!isVisiblePassword)}
                icon="key"
              />
              <ControlledInput
                name="password"
                control={methods.control}
                autoCapitalize="none"
                secureTextEntry={!isVisiblePassword}
                keyboardType="default"
                placeholder="Insira o seu senha"
              />
            </TextInput.Wrapper>
            <Button
              text="Entrar"
              onPress={handleSubmit(onSubmit)}
              isLoading={isLoading}
            />
          </Card.Container>
        </Card.Wrapper>
      </S.Root.WrapperIndex>
    </>
  );
}
