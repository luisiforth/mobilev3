import styled from 'styled-components/native';

const Wrapper = styled.View``;

const ContentWrapper = styled.View`
  border: 1px solid black;
  border-radius: 4px;
  /* flex-direction: row; */
`;

const Error = styled.Text`
  color: red;
`;

const Text = styled.Text`
  font-size: 17px;
  padding-bottom: 6px;
  color: ${({ theme }) => theme.colors.black};
`;

export const Root = {
  ContentWrapper: ContentWrapper,
  Error: Error,
  Text: Text,
  Wrapper: Wrapper,
};
