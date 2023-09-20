import { FieldError } from 'react-hook-form';

import * as S from './styles';

type InputProps = {
  children: React.ReactNode;
  label: string;
  error?: FieldError;
};

export default function SelectRoot({ children, error, label }: InputProps) {
  return (
    <S.Root.Wrapper>
      <S.Root.Text>{label}</S.Root.Text>
      <S.Root.ContentWrapper>{children}</S.Root.ContentWrapper>
      {error && <S.Root.Error> {error.message} * </S.Root.Error>}
    </S.Root.Wrapper>
  );
}
