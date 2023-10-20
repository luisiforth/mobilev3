import { ReactNode } from 'react';

import * as S from './styles';

type CardCepRootProps = {
  children: ReactNode;
  color: string;
};

export default function CardRefWrapperSection({
  children,
  color,
}: CardCepRootProps) {
  return (
    //@ts-ignore
    <S.Root.WrapperSection color={color}>{children}</S.Root.WrapperSection>
  );
}
