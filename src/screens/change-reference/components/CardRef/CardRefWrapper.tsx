import { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type CardCepRootProps = {
  children: ReactNode;
  color: string;
} & TouchableOpacityProps;

export default function CardRefWrapper({
  children,
  color,
  ...props
}: CardCepRootProps) {
  return (
    <S.Root.Wrapper activeOpacity={0.7} {...props}>
      <S.Root.Bar color={color} />
      {children}
    </S.Root.Wrapper>
  );
}
