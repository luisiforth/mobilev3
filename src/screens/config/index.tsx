import { useState } from 'react';
import { View, Alert, Text, Switch } from 'react-native';

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
  const toggleSwitch = (e) => {
    setIsEnabled((previousState) => !previousState);
  };
  const { setEndPoint, endpoint } = useEndPointStore();
  const { setRetific, retific } = useRetificStore();
  const [isEnabled, setIsEnabled] = useState(false || retific);
  const handleEnv = (value: string) => {
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
  console.log(retific);
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
                flexDirection: 'row',
              }}
            >
              <Button text="Adicionar" onPress={() => handleEnv(value)} />
            </View>
          </View>
        )}
      </S.Root.Wrapper>
    </>
  );
}
