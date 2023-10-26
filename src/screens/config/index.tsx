import { useState } from 'react';

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
  const { setEndPoint, endpoint } = useEndPointStore();

  const handleEnv = (value: string) => {
    setEndPoint(value);
    api.defaults.baseURL = value;
  };
  const handleAcess = (value: string) => {
    if (!user.trim() || user != 'admin') return;
    const date = format(new Date(), 'dd/MM/yyyy');

    if (date == value) {
      return setIsVisible((prev) => !prev);
    }
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
  ];

  return (
    <>
      <S.Root.Wrapper insets={{ top: 60 }}>
        <TextInput.Wrapper label="Usuário">
          <TextInput.Content onChangeText={setUser} />
        </TextInput.Wrapper>
        <TextInput.Wrapper label="Senha:">
          <TextInput.Content onChangeText={handleAcess} />
        </TextInput.Wrapper>
        {isVisible && (
          <Select.Wrapper required label="Selecione o endpoint">
            <Picker selectedValue={endpoint} onValueChange={handleEnv}>
              <Picker.Item label={'Selecione'} enabled={false} />
              {ENVs.map((v, key) => (
                <Picker.Item
                  key={key}
                  label={v.label as string}
                  value={v.value}
                />
              ))}
            </Picker>
          </Select.Wrapper>
        )}
        {/* <Button text="Adicionar" onPress={() => handleEnv(value)} /> */}
      </S.Root.Wrapper>
    </>
  );
}
