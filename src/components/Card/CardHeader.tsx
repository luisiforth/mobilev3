import { CardProps } from './types/card-type';

import * as S from './styles';

type CardHeaderProps = Pick<CardProps, 'children'>;

export function CardHeader({ children }: CardHeaderProps) {
  return <S.Root.Header>{children}</S.Root.Header>;
}
