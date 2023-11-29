import { useState } from 'react';
import { View, Alert } from 'react-native';

import Button from '@/components/Button';
import { Select } from '@/components/Select';
import { TextInput } from '@/components/TextInput';
import { useEndPointStore } from '@/store/filterStore';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';
import { api } from 'util/axios/axios';

import * as S from './styles';

export default function ConfigPageLayout() {
  const [user, setUser] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [value, setValue] = useState('');

  const { setEndPoint, endpoint } = useEndPointStore();

  const handleEnv = (value: string) => {
    setEndPoint(value);
    api.defaults.baseURL = value;

    Alert.alert('', 'Endpoint informado com sucesso');
  };

  const handleAcess = (value: string) => {
    if (!user.trim() || user != 'admin') return;
    const date = format(new Date(), 'dd/MM/yyyy');

    if (date == value) {
      return setIsVisible((prev) => !prev);
    }
  };

  const toggle = () => {
    setIsVisiblePassword((prev) => !prev);
  };

  const ENVs = [
    {
      label: 'ELIZABETH',
      value: process.env.EXPO_PUBLIC_ELIZABETH_API_URL,
    },
    {
      label: 'DEXCO',
      value: process.env.EXPO_PUBLIC_DEXCO_API_URL,
    },
    {
      label: 'TESTE',
      value: process.env.EXPO_PUBLIC_TESTE_API_URL,
    },
  ];

  return (
    <>
      {/* @ts-ignore */}
      <S.Root.Wrapper insets={{ top: 60 }}>
        {!isVisible ? (
          <>
            <TextInput.Wrapper label="Usuário">
              <TextInput.Content
                autoCapitalize="none"
                onChangeText={setUser}
                placeholder="Informar usuário"
              />
            </TextInput.Wrapper>
            <TextInput.Wrapper label="Senha:">
              <TextInput.Icon
                onPressIn={toggle}
                onPressOut={toggle}
                icon="key"
              />
              <TextInput.Content
                autoCapitalize="none"
                secureTextEntry={!isVisiblePassword}
                keyboardType="default"
                placeholder="Informar senha"
                onChangeText={handleAcess}
              />
            </TextInput.Wrapper>
          </>
        ) : (
          <View style={{ flex: 1, gap: 20 }}>
            <Select.Wrapper required label="Informe a base a ser utilizada">
              <Picker
                selectedValue={value || endpoint}
                onValueChange={setValue}
              >
                <Picker.Item label={'Selecione'} enabled={true} />
                {ENVs.map((v, key) => (
                  <Picker.Item
                    key={key}
                    label={v.label as string}
                    value={v.value}
                  />
                ))}
              </Picker>
            </Select.Wrapper>
            <Button text="Adicionar" onPress={() => handleEnv(value)} />
          </View>
        )}
      </S.Root.Wrapper>
    </>
  );
}
