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

const ContainerButton = styled.View`
  margin-top: ${({ theme }) => theme.spacings[20]};
  flex-direction: row;
  justify-content: center;
`;

export const Root = {
  ContainerButton: ContainerButton,
  Wrapper: Wrapper,
  WrapperModal: WrapperModal,
};
