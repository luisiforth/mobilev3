import { EdgeInsets } from 'react-native-safe-area-context';

import styled from 'styled-components/native';

type WrapperIndexProps = {
  insets: EdgeInsets;
};

const Wrapper = styled.View<WrapperIndexProps>`
  flex: 1;
  gap: 16px;
  align-items: center;
  padding: ${({ insets }) => insets.top}px ${({ theme }) => theme.spacings[20]};
`;

export const Root = {
  Wrapper: Wrapper,
};
