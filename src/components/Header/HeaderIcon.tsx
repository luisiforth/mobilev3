import React from 'react';
import { TouchableOpacityProps } from 'react-native';

import { Feather } from '@expo/vector-icons';
type OptionsProps = {
  name: keyof typeof Feather.glyphMap;
} & TouchableOpacityProps;

export function HeaderIcon({ name, ...props }: OptionsProps) {
  return <Feather name={name} size={25} {...props} color={'black'} />;
}
