import { useRef, useCallback, useState } from 'react';
import { TextInput, TouchableOpacityProps } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import * as S from './styles';
type SearchProps = {
  placeholder: string;
  onChangeText?: (text: string) => void;
} & TouchableOpacityProps;

export default function Search({ placeholder, ...props }: SearchProps) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);
  const theme = useTheme();
  const handleSelectedInput = useCallback(() => {
    inputRef.current?.focus();
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const handleFocus = useCallback(() => {
    if (isFocused) {
      return theme.colors.primary.ring;
    }
    return theme.colors.primary[500];
  }, [isFocused]);

  return (
    <S.Root.Input
      activeOpacity={0.8}
      onPress={handleSelectedInput}
      //@ts-ignore
      onFocused={isFocused}
      {...props}
    >
      <TextInput
        ref={inputRef}
        onBlur={handleBlur}
        onFocus={handleSelectedInput}
        maxLength={29}
        placeholder={placeholder}
      />
      <Feather name="search" size={25} color={handleFocus()} />
    </S.Root.Input>
  );
}
