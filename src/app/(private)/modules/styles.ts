import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const Image = styled.Image`
  background: ${({ theme }) => theme.colors.gray[400]};
  height: 55px;
  flex-direction: row;
  justify-content: space-around;
  width: 55px;
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.font.sizes.md};
  font-weight: ${({ theme }) => theme.font.medium};
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.font.sizes.lg};
  font-weight: ${({ theme }) => theme.font.bold};
`;

export const Root = {
  Wrapper: Wrapper,
  Image: Image,
  Text: Text,
  Title: Title,
};
