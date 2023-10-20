import { TouchableOpacityProps } from 'react-native';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

type InputProps = {
  icon: keyof typeof Feather.glyphMap;
  disableTouch?: boolean;
} & TouchableOpacityProps;

export default function InputIcon({
  icon,
  disableTouch = false,
  ...props
}: InputProps) {
  const theme = useTheme();
  return (
    <S.Root.Icon disabled={disableTouch} activeOpacity={0.5} {...props}>
      <Feather name={icon} size={25} color={theme.colors.black} />
    </S.Root.Icon>
  );
}
