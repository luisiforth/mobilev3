import { CardProps } from './types/card-type';

import * as S from './styles';

type CardDescriptionProps = Pick<CardProps, 'description'>;

export function CardDescription({ description }: CardDescriptionProps) {
  return <S.Root.Description>{description}</S.Root.Description>;
}
