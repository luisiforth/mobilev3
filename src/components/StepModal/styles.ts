import styled from 'styled-components/native';

const Wrapper = styled.View`
  /* align-self: center; */
  /* width: 100%; */
  gap: ${({ theme }) => theme.spacings[10]};
  padding: 0 ${({ theme }) => theme.spacings[10]};
`;

type ButtonProps = {
  finalStep: boolean;
};

const Button = styled.TouchableOpacity<ButtonProps>`
  align-items: center;
  justify-content: center;
  flex-direction: row;
  border-radius: ${({ theme }) => theme.border.radius[6]};
  padding: ${({ theme }) => theme.spacings[20]};
  opacity: ${({ disabled }) => (disabled ? 0.5 : 1)};
  background-color: ${({ theme, finalStep }) =>
    finalStep ? theme.colors.green.button : theme.colors.primary[300]};
  flex: 1 0 150px;
`;

const Text = styled.Text`
  color: white;
`;

const Content = styled.View`
  /* justify-content: space-between; */
  flex-direction: row;
  gap: ${({ theme }) => theme.spacings[10]};
  padding: ${({ theme }) => theme.spacings[10]} 0;
`;

export const Root = {
  Button: Button,
  Content: Content,
  Text: Text,
  Wrapper: Wrapper,
};
