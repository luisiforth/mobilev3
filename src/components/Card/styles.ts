import styled from 'styled-components/native';

const Container = styled.View`
  /* flex: 1; */
  gap: ${({ theme }) => theme.spacings[10]};
`;

const Description = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.font.sizes.md};
  font-weight: ${({ theme }) => theme.font.regular};
`;

const Header = styled.View`
  gap: ${({ theme }) => theme.spacings[6]};
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.font.sizes.lg};
  font-weight: ${({ theme }) => theme.font.bold};
`;

const Wrapper = styled.View`
  gap: ${({ theme }) => theme.spacings[10]};
`;

export const Root = {
  Container: Container,
  Description: Description,
  Header: Header,
  Text: Text,
  Wrapper: Wrapper,
};
