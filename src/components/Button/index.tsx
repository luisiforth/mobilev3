import { TouchableOpacityProps, View } from 'react-native';

import { useTheme } from 'styled-components/native';

import * as S from './styles';

type ButtonProps = {
  text: string;
  color?: string;
  isLoading?: boolean;
  icon?: React.ReactNode;
  size?: 'small' | 'medium' | 'large';
} & TouchableOpacityProps;

export default function Button({
  isLoading,
  text,
  color,
  size = 'small',
  icon,
  ...props
}: ButtonProps) {
  const theme = useTheme();

  const TextModifiers = {
    large: 24,
    medium: 16,
    small: 12,
  };
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
        <View
          style={{
            alignItems: 'center',
            flexDirection: 'row',
            gap: 10,
            justifyContent: 'center',
            paddingVertical: TextModifiers[size],
          }}
        >
          {icon}
          {/* @ts-ignore */}
          <S.Root.Text size={size}>{text}</S.Root.Text>
        </View>
      )}
    </S.Root.Wrapper>
  );
}
