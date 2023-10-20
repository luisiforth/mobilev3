import styled from 'styled-components/native';
type TouchProps = {
  onFocused: boolean;
};
const Input = styled.TouchableOpacity<TouchProps>`
  align-items: center;
  flex-direction: row;
  width: 70%;
  background: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme, onFocused }) =>
    onFocused
      ? `${theme.border.radius[6]} ${theme.border.radius[6]} 0 0`
      : theme.border.radius[6]};
  border-color: ${({ theme, onFocused }) =>
    onFocused ? theme.colors.primary.ring : 'transparent'};
  border-bottom-width: 2px;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacings[10]};
`;

const Focused = styled.TouchableOpacity``;

export const Root = {
  Input: Input,
  Focused: Focused,
};
