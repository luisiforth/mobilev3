import styled from 'styled-components/native';

const Wrapper = styled.View``;

const ContentWrapper = styled.View`
  border: 1px solid black;
  border-radius: ${({ theme }) => theme.border.radius[4]};
  /* flex-direction: row; */
`;

const Error = styled.Text`
  color: red;
`;

const Text = styled.Text`
  font-size: 17px;
  padding-bottom: ${({ theme }) => theme.spacings[6]};
  color: ${({ theme }) => theme.colors.black};
`;

export const Root = {
  ContentWrapper: ContentWrapper,
  Error: Error,
  Text: Text,
  Wrapper: Wrapper,
};
