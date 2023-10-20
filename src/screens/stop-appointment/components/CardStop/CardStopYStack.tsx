import { ReactNode } from 'react';

import * as S from './styles';

type CardCepRootProps = {
  children: ReactNode;
};

export default function CardStopYStack({ children }: CardCepRootProps) {
  return <S.Root.YStack>{children}</S.Root.YStack>;
}
