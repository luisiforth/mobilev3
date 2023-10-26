import { useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import { Alert, Image, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Button from '@/components/Button';
import { Card } from '@/components/Card';
import { ControlledInput } from '@/components/ControlledInput';
import { TextInput } from '@/components/TextInput';
import { useAuth } from '@/hooks/useAuth';
import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { router } from 'expo-router';

import { schema } from './schema';

import * as S from './styles';
// import { Image } from 'expo-image';

export default function LoginLayout() {
  const [isLoading, setIsLoading] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const insets = useSafeAreaInsets();
  const { signIn } = useAuth();
  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    handleSubmit,
    formState: { errors },
  } = methods;

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    setIsLoading(true);

    if (!data.user.trim() || !data.password.trim()) {
      setIsLoading(false);
      return Alert.alert('Erro', 'Todos os campos são obrigatórios');
    }

    try {
      await signIn(data.user, data.password);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      console.log('Erro', 'Não foi possível realizar o login');
    }

    return;
  };

  return (
    <>
      <S.Root.WrapperIndex insets={insets}>
        <View style={{ alignSelf: 'flex-start' }}>
          <Feather
            name={'settings'}
            onPress={() => router.push('/config')}
            size={24}
            color={'black'}
          />
        </View>
        <Image
          style={{ width: 400, height: 300, marginBottom: -80 }}
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
