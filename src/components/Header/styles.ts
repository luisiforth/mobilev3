import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

type WrapperTopMessageProps = {
  insets: number;
};

const Wrapper = styled.View`
  gap: ${({ theme }) => theme.spacings[20]};
  /* flex-direction: row; */
  /* justify-content: space-between; */
`;

const WrapperTopMessage = styled.View<WrapperTopMessageProps>`
  background: ${({ theme }) => theme.colors.gray[200]};
  padding-top: ${({ insets }) => insets}px;
  padding-bottom: ${({ theme }) => theme.spacings[10]};
  gap: ${({ theme }) => theme.spacings[6]};
  align-items: center;
`;

const var_height = 65;
const var_width = 65;

const YStack = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
`;

const ShimmerPlaceholderStyleAvatar = styled(ShimmerPlaceholder)`
  border-radius: ${({ theme }) => theme.border.radius.full};
  height: ${var_height}px;
  width: ${var_width}px;
`;

const ShimmerPlaceholderStyleText = styled(ShimmerPlaceholder)`
  width: fit-content;
  height: 25px;
  border-radius: ${({ theme }) => theme.border.radius[6]};
`;

const Image = styled.Image`
  /* background: ${({ theme }) => theme.colors.gray[400]}; */
  border-radius: ${({ theme }) => theme.border.radius.full};
  height: 55px;
  width: 55px;
`;

const BorderImage = styled.View`
  border: 2px dashed ${({ theme }) => theme.colors.primary[500]};
  height: ${var_height}px;
  width: ${var_width}px;
  background: ${({ theme }) => theme.colors.background};
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.border.radius.full};
`;

const Text_TopMessage = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.font.sizes.sm};
  font-weight: ${({ theme }) => theme.font.medium};
`;

const Text = styled.Text`
  color: ${({ theme }) => theme.colors.black};
  font-size: ${({ theme }) => theme.font.sizes.md};
  font-weight: ${({ theme }) => theme.font.medium};
`;

const Title = styled.Text`
  color: ${({ theme }) => theme.colors.primary[500]};
  font-size: ${({ theme }) => theme.font.sizes.lg};
  font-weight: ${({ theme }) => theme.font.bold};
`;

export const Root = {
  Image: Image,
  BorderImage: BorderImage,
  SkeletonAvatar: ShimmerPlaceholderStyleAvatar,
  SkeletonText: ShimmerPlaceholderStyleText,
  Text: Text,
  TextTopMessage: Text_TopMessage,
  Title: Title,
  Wrapper: Wrapper,
  WrapperTopMessage: WrapperTopMessage,
  YStack: YStack,
};
