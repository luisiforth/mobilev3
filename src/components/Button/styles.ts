import { TouchableOpacityProps } from 'react-native';

import styled from 'styled-components/native';

export type WrapperProps = {
  color: string;
} & TouchableOpacityProps;

const Wrapper = styled.TouchableOpacity<WrapperProps>`
  border-radius: 6px;
  background-color: ${({ color, theme }) =>
    color ? color : theme.colors.primary[300]};
  opacity: ${({ disabled }) => (disabled ? 0.7 : 1)};
`;

const Spinner = styled.ActivityIndicator`
  padding: 12px;
`;

const Text = styled.Text`
  padding: 12px;
  margin: 0 auto;
  color: white;
`;

export const Root = {
  Spinner: Spinner,
  Text: Text,
  Wrapper: Wrapper,
};
