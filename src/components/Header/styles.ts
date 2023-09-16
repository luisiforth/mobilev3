import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const Wrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
`;

const ShimmerPlaceholderStyleAvatar = styled(ShimmerPlaceholder)`
  height: 55px;
  width: 55px;
  border-radius: ${({ theme }) => theme.border.radius.full};
`;

const ShimmerPlaceholderStyleText = styled(ShimmerPlaceholder)`
  width: fit-content;
  height: 25px;
  border-radius: ${({ theme }) => theme.border.radius[6]};
`;

const Image = styled.Image`
  background: ${({ theme }) => theme.colors.gray[400]};
  border-radius: ${({ theme }) => theme.border.radius.full};
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
  SkeletonAvatar: ShimmerPlaceholderStyleAvatar,
  SkeletonText: ShimmerPlaceholderStyleText,
  Wrapper: Wrapper,
  Image: Image,
  Text: Text,
  Title: Title,
};
