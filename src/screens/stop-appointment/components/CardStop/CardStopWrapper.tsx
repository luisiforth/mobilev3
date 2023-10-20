import { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type CardCepRootProps = {
  children: ReactNode;
} & TouchableOpacityProps;

export default function CardStopWrapper({
  children,
  ...props
}: CardCepRootProps) {
  return (
    <S.Root.Wrapper activeOpacity={0.7} {...props}>
      {children}
    </S.Root.Wrapper>
  );
}
