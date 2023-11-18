import { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type CardCepRootProps = {
  children: ReactNode;
  onAsync: boolean;
} & TouchableOpacityProps;

export function CardCepRoot({
  children,
  onAsync = false,
  ...props
}: CardCepRootProps) {
  return (
    <S.Root.Wrapper activeOpacity={0.9} onAsync={onAsync} {...props}>
      {children}
      {/* <CardCep.Icon /> */}
    </S.Root.Wrapper>
  );
}
