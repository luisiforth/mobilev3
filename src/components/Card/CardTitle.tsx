import { CardProps } from './types/card-type';

import * as S from './styles';

type CardTitleProps = Pick<CardProps, 'title'>;

export function CardTitle({ title }: CardTitleProps) {
  return <S.Root.Text>{title}</S.Root.Text>;
}
