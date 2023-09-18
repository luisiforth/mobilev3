import styled from 'styled-components/native';

const Wrapper = styled.View`
  align-self: center;
  background-color: white;
  border-radius: 8px 8px 0 0;
  width: 100%;
  gap: 15px;
  padding: ${({ theme }) => theme.spacings[15]};
`;

export const Root = {
  Wrapper: Wrapper,
};
