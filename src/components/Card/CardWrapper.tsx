import { View } from 'react-native';

import { CardProps } from './types/card-type';

import { style } from './styles';

type CardWrapperProps = Pick<CardProps, 'children'>;

export function CardWrapper({ children }: CardWrapperProps) {
  return <View style={style.wrapper}>{children}</View>;
}
