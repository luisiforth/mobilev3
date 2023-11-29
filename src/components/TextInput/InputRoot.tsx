import { Text, ViewProps } from 'react-native';

import * as S from './styles';

type InputProps = {
  children?: React.ReactNode;
  label: string;
  error?: string;
  required?: boolean;
} & ViewProps;

export default function InputRoot({
  children,
  error,
  label,
  required = false,
  ...props
}: InputProps) {
  return (
    <S.Root.Wrapper {...props}>
      <S.Root.Text>
        {label} {required && <Text style={{ color: 'red' }}> *</Text>}
      </S.Root.Text>
      <S.Root.ContentWrapper>{children}</S.Root.ContentWrapper>
      {error && <S.Root.Error> {error} </S.Root.Error>}
    </S.Root.Wrapper>
  );
}
