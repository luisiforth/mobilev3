import { ReactNode } from 'react';

import * as S from './styles';

type CardCepRootProps = {
  children: ReactNode;
};

export default function CardStopXStack({ children }: CardCepRootProps) {
  return <S.Root.XStack>{children}</S.Root.XStack>;
}
