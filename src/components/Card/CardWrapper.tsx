import { CardProps } from './types/card-type';

import * as S from './styles';

type CardWrapperProps = Pick<CardProps, 'children'>;

export function CardWrapper({ children }: CardWrapperProps) {
  return <S.Root.Wrapper>{children}</S.Root.Wrapper>;
}
