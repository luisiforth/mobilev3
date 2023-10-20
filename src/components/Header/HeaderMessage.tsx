import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import { HeaderProps } from './types/header-type';

import * as S from './styles';

type HeaderTextProps = Pick<HeaderProps, 'text'>;

export function HeaderMessage({ text }: HeaderTextProps) {
  const insets = useSafeAreaInsets();
  const theme = useTheme();
  return (
    <S.Root.WrapperTopMessage insets={insets.top!}>
      <Feather name={'wifi-off'} size={15} color={theme.colors.black} />
      {/* <S.Root.YStack> */}
      <S.Root.TextTopMessage>{text}</S.Root.TextTopMessage>
      {/* <Feather name={'refresh-ccw'} size={15} color={theme.colors.black} /> */}
      {/* </S.Root.YStack> */}
    </S.Root.WrapperTopMessage>
  );
}
