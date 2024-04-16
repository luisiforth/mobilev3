import { useState } from 'react';
import {
  View,
  Alert,
  Text,
  Switch,
  Button as ButtonNative,
} from 'react-native';
import { useQuery } from 'react-query';

import Button from '@/components/Button';
import { Select } from '@/components/Select';
import { TextInput } from '@/components/TextInput';
import { useEndPointStore, useRetificStore } from '@/store/filterStore';
import { Picker } from '@react-native-picker/picker';
import { format } from 'date-fns';
import { api } from 'util/axios/axios';

import * as S from './styles';

export default function ConfigPageLayout() {
  const [user, setUser] = useState('');
  const [isVisible, setIsVisible] = useState(false);
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [value, setValue] = useState('');
  const [isChecked, setIsChecked] = useState(false);
  const toggleSwitch = (e) => {
    setIsEnabled((previousState) => !previousState);
  };
  const { setEndPoint, endpoint } = useEndPointStore();
  const { setRetific, retific } = useRetificStore();
  const [isEnabled, setIsEnabled] = useState(false || retific);
  async function fetchData() {
    if (!endpoint) return Alert.alert('', 'Por favor, selecione uma rota.');
    try {
      const response = await api.get('/v1/cr8/check');
      console.log(response.data);
      return Alert.alert('', 'Rota com acesso.');
    } catch (err) {
      console.log(err);
    }
  }
  // console.log(fetchData());

  const handleEnv = (value: string) => {
    setIsChecked(true);
    setEndPoint(value);
    setRetific(isEnabled);
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

  const toggle = (e) => {
    setIsVisiblePassword((prev) => !prev);
  };

  const ENVs = [
    {
      label: 'DEXCO',
      value: process.env.EXPO_PUBLIC_DEXCO_API_URL,
    },
    {
      label: 'TESTE - DEXCO',
      value: process.env.EXPO_PUBLIC_TESTE_API_URL,
    },
    {
      label: 'TESTE - INTERNO',
      value: process.env.EXPO_PUBLIC_INTERNALTEST_DEXCO_API_URL,
    },
  ];

  return (
    <>
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
                onValueChange={(itemValue) => {
                  setValue(itemValue), setIsChecked(false);
                }}
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
            <TextInput.Wrapper required label="É Retifica ?">
              <Text
                style={{ fontWeight: '600', fontSize: 20, marginRight: 10 }}
              >
                {isEnabled ? 'Sim' : 'Não'}
              </Text>
              <Switch
                style={{ transform: [{ scaleX: 1.3 }, { scaleY: 1.3 }] }}
                value={isEnabled}
                onValueChange={toggleSwitch}
              />
            </TextInput.Wrapper>
            <View
              style={{
                flexDirection: 'column',
                gap: 10,
                height: 100,
              }}
            >
              <Button text="Adicionar" onPress={() => handleEnv(value)} />
              <Button
                disabled={!isChecked}
                style={{ backgroundColor: 'blue' }}
                text="Teste a rota"
                onPress={() => fetchData()}
              />
            </View>
          </View>
        )}
      </S.Root.Wrapper>
    </>
  );
}
