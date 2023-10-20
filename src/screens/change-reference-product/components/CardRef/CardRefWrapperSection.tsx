import { ReactNode } from 'react';
import { TouchableOpacityProps } from 'react-native';

import * as S from './styles';

type CardCepRootProps = {
  children: ReactNode;
  color: string;
} & TouchableOpacityProps;

export default function CardRefWrapperSection({
  children,
  color,
  ...props
}: CardCepRootProps) {
  return (
    //@ts-ignore
    <S.Root.WrapperSection {...props} color={color}>
      {children}
    </S.Root.WrapperSection>
  );
}
