import { TouchableOpacityProps } from 'react-native';

import styled, { DefaultTheme, css } from 'styled-components/native';

export type WrapperProps = {
  color: string;
} & TouchableOpacityProps;

export type TText = {
  size: 'small' | 'medium' | 'large';
};

const Wrapper = styled.TouchableOpacity<WrapperProps>`
  flex: 1;
  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.primary[300]};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

const Spinner = styled.ActivityIndicator`
  padding: 12px;
`;

const TextModifiers = {
  large: (theme: DefaultTheme) => css`
    padding: 24px;
    font-size: ${theme.font.sizes.lg};
  `,
  medium: (theme: DefaultTheme) => css`
    padding: 16px;
    font-size: ${theme.font.sizes.md};
  `,

  small: () => css`
    padding: 12px;
  `,
};

const Text = styled.Text<TText>`
  ${({ size, theme }) => css`
    margin: 0 auto;
    color: white;

    ${!!size && TextModifiers[size](theme)};
  `}
`;

export const Root = {
  Spinner: Spinner,
  Text: Text,
  Wrapper: Wrapper,
};
