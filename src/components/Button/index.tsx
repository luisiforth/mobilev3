import { TouchableOpacityProps } from 'react-native';

import { useTheme } from 'styled-components/native';

import * as S from './styles';

type ButtonProps = {
  text: string;
  color?: string;
  isLoading?: boolean;
  size?: 'small' | 'medium' | 'large';
} & TouchableOpacityProps;

export default function Button({
  isLoading,
  text,
  color,
  size = 'small',
  ...props
}: ButtonProps) {
  const theme = useTheme();
  return (
    <S.Root.Wrapper
      disabled={isLoading}
      //@ts-ignore
      color={color}
      activeOpacity={0.7}
      {...props}
    >
      {isLoading ? (
        <S.Root.Spinner size="small" color={theme.colors.white[500]} />
      ) : (
        //@ts-ignore
        <S.Root.Text size={size}>{text}</S.Root.Text>
      )}
    </S.Root.Wrapper>
  );
}
