import { PressableProps } from 'react-native';

import { Feather } from '@expo/vector-icons';

import * as S from './styles';
import theme from '@/styles/theme';

type InputProps = {
  icon: keyof typeof Feather.glyphMap;
  disableTouch?: boolean;
} & PressableProps;

export default function InputIcon({
  icon,
  disableTouch = true,
  ...props
}: InputProps) {
  return (
    <S.Root.Icon disabled={disableTouch} {...props}>
      <Feather name={icon} size={25} color={theme.colors.black} />
    </S.Root.Icon>
  );
}
