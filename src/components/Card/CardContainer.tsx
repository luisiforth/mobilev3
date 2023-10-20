import { CardProps } from './types/card-type';

import * as S from './styles';

type CardWrapperProps = Pick<CardProps, 'children'>;

export function CardContainer({ children }: CardWrapperProps) {
  return <S.Root.Container>{children}</S.Root.Container>;
}
