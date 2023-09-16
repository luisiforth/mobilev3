import { Text } from 'react-native';

import { CardProps } from './types/card-type';

import { style } from './styles';

type CardTitleProps = Pick<CardProps, 'title'>;

export function CardTitle({ title }: CardTitleProps) {
  return <Text style={style.title}>{title}</Text>;
}
