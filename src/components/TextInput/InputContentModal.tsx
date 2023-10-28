import { useState } from 'react';
import { TextInputProps } from 'react-native';

import * as S from './styles';

export type InputProps = {
  value?: string;
} & TextInputProps;

export default function InputContentModal({ value, ...props }: InputProps) {
  const [onFocus, setOnFocus] = useState(false);
  const [onBlur, setOnBlur] = useState(false);

  function handleInputFocus() {
    setOnFocus(!onFocus);
  }

  function handleInputBlur() {
    setOnFocus(false);
    setOnBlur(!!onBlur);
  }
  return (
    <S.Root.InputModal
      value={value}
      focusable={onFocus}
      onFocus={handleInputFocus}
      onBlur={handleInputBlur}
      {...props}
    />
  );
}
