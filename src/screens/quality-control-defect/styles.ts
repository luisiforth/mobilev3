import styled from 'styled-components/native';

const Wrapper = styled.View`
  flex: 1;
  justify-content: space-between;
  padding: ${({ theme }) => theme.spacings[20]};
`;

const WrapperModal = styled.View`
  padding: ${({ theme }) => theme.spacings[20]};
  gap: ${({ theme }) => theme.spacings[10]};
`;

export const Root = {
  Wrapper: Wrapper,
  WrapperModal: WrapperModal,
};
