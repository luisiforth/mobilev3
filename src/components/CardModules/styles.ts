import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import { Feather } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';

const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerPlaceholderStyleText = styled(ShimmerPlaceholder)`
  width: fit-content;
  height: 25px;
  border-radius: ${({ theme }) => theme.border.radius[6]};
`;

const ShimmerPlaceholderStyleIcon = styled(ShimmerPlaceholder)`
  width: 30px;
  height: 25px;
  border-radius: ${({ theme }) => theme.border.radius[6]};
`;

const Wrap = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacings[20]};
`;

const Wrapper = styled.TouchableOpacity`
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid ${({ theme }) => theme.colors.primary[500]};
  border-radius: ${({ theme }) => theme.border.radius[10]};
  padding: ${({ theme }) => theme.spacings[12]};
  flex: 1 0 150px;
  margin: 5px;
  gap: ${({ theme }) => theme.spacings[10]};
  align-items: center;
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

const Icon = styled(Feather)``;

export const Root = {
  Icon: Icon,
  SkeletonIcon: ShimmerPlaceholderStyleIcon,
  SkeletonText: ShimmerPlaceholderStyleText,
  Text: Text,
  Title: Title,
  Wrap: Wrap,
  Wrapper: Wrapper,
};
