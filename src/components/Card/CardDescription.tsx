import { Text } from 'react-native';

import { CardProps } from './types/card-type';

import { style } from './styles';

type CardDescriptionProps = Pick<CardProps, 'description'>;

export function CardDescription({ description }: CardDescriptionProps) {
  return <Text style={style.description}>{description}</Text>;
}
