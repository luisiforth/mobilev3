import { View } from 'react-native';

import { CardProps } from './types/card-type';

import { style } from './styles';

type CardWrapperProps = Pick<CardProps, 'children'>;

export function CardContainer({ children }: CardWrapperProps) {
  return <View style={style.container}>{children}</View>;
}
