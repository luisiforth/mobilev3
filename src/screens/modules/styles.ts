import { EdgeInsets } from 'react-native-safe-area-context';

import styled from 'styled-components/native';

type WrapperIndexProps = {
  insets: EdgeInsets;
};

const WrapperIndex = styled.View<WrapperIndexProps>`
  flex: 1;
  gap: ${({ theme }) => theme.spacings[20]};
  padding: ${({ insets }) => insets.top}px ${({ theme }) => theme.spacings[20]};
`;

const HeaderSlash = styled.View`
  height: 10px;
  width: 50%;
  border-radius: ${({ theme }) => theme.border.radius.full};
  background-color: ${({ theme }) => theme.colors.gray[300]};
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

const WrapperFlatList = styled.View`
  width: 100%;
  height: 370px;
`;

const WrapperModal = styled.View`
  gap: ${({ theme }) => theme.spacings[10]};
  padding: ${({ theme }) => theme.spacings[20]};
`;

export const Root = {
  HeaderSlash: HeaderSlash,
  Image: Image,
  Text: Text,
  Title: Title,
  Wrapper: Wrapper,
  WrapperFlatList: WrapperFlatList,
  WrapperIndex: WrapperIndex,
  WrapperModal: WrapperModal,
};
