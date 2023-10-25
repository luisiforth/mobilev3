import { useEffect, useState } from 'react';

import Button from '@/components/Button';
import { TextInput } from '@/components/TextInput';

import * as S from './styles';

export default function ConfigPageLayout() {
  const [value, setValue] = useState('');

  const handleEnv = (value: string) => {
    console.log(process.env.EXPO_PUBLIC_API_URL);
    process.env.EXPO_PUBLIC_API_URL = value;
  };

  return (
    <S.Root.Wrapper insets={{ top: 20 }}>
      <TextInput.Wrapper label="Digite o endpoint">
        <TextInput.Content onChangeText={(text) => setValue(text)} />
      </TextInput.Wrapper>
      <Button text="Adicionar" onPress={() => handleEnv(value)} />
    </S.Root.Wrapper>
  );
}
