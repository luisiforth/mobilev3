import { EdgeInsets } from 'react-native-safe-area-context';

import styled from 'styled-components/native';

type WrapperIndexProps = {
  insets: EdgeInsets;
};

const WrapperIndex = styled.View<WrapperIndexProps>`
  flex: 1;
  justify-content: space-evenly;
  align-items: center;
  padding: ${({ insets }) => insets.top}px ${({ theme }) => theme.spacings[20]};
`;

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
  Image: Image,
  Text: Text,
  Title: Title,
  Wrapper: Wrapper,
  WrapperIndex: WrapperIndex,
};
