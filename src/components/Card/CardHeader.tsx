import { View } from 'react-native';

import { CardProps } from './types/card-type';

import { style } from './styles';

type CardHeaderProps = Pick<CardProps, 'children'>;

export function CardHeader({ children }: CardHeaderProps) {
  return <View style={style.header}>{children}</View>;
}
