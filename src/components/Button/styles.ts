import { TouchableOpacity } from 'react-native';

import styled from 'styled-components/native';

export type ButtonTypeStyleProps = 'PRIMARY' | 'SECONDARY';
export type StyledProps = {
  type: ButtonTypeStyleProps;
};
const Wrapper = styled(TouchableOpacity)<StyledProps>`
  border-radius: 6px;
  background-color: blue;
`;

const Text = styled.Text`
  padding: 12px;
  margin: 0 auto;
  color: white;
`;

export const Root = {
  Wrapper: Wrapper,
  Text: Text,
};
