import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';

import { LinearGradient } from 'expo-linear-gradient';
import styled from 'styled-components/native';
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient);

const ShimmerPlaceholderStyleContainer = styled(ShimmerPlaceholder)`
  border-radius: ${({ theme }) => theme.border.radius[10]};
  height: 150px;
  width: 100%;
`;
const Wrapper = styled.View`
  height: 150px;
  width: 100%;
  background-color: ${({ theme }) => theme.colors.background};
  border-radius: ${({ theme }) => theme.border.radius[10]};
`;

export const Root = {
  ShimmerPlaceholderStyleContainer: ShimmerPlaceholderStyleContainer,
  Wrapper: Wrapper,
};
