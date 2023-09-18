import styled from 'styled-components/native';

const Wrapper = styled.View``;

const ContentWrapper = styled.View`
  align-items: center;
  border: 1px solid black;
  flex-direction: row;
  border-radius: ${({ theme }) => theme.border.radius[10]};
`;

const Error = styled.Text`
  color: red;
`;

const Text = styled.Text`
  font-size: 17px;
  padding-bottom: 6px;
  color: ${({ theme }) => theme.colors.black};
`;

const Icon = styled.Pressable`
  padding-left: 10px;
`;

const Input = styled.TextInput`
  width: 90%;
  padding: 10px;
  font-size: 16px;
  color: ${({ theme }) => theme.colors.black};
`;

export const Root = {
  ContentWrapper: ContentWrapper,
  Error: Error,
  Icon: Icon,
  Input: Input,
  Text: Text,
  Wrapper: Wrapper,
};
