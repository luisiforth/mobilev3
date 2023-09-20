import styled from 'styled-components/native';

const HeaderWrapper = styled.View`
  align-items: center;
  margin-bottom: ${({ theme }) => theme.spacings[15]};
`;

const Wrapper = styled.View`
  gap: ${({ theme }) => theme.spacings[15]};
  padding: ${({ theme }) => theme.spacings[15]};
  background-color: ${({ theme }) => theme.colors.white[500]};
`;

const HeaderCircle = styled.View`
  height: 10px;
  width: 30%;
  border-radius: ${({ theme }) => theme.border.radius.full};
  background-color: ${({ theme }) => theme.colors.gray[500]};
`;

export const Root = {
  HeaderCircle: HeaderCircle,
  HeaderWrapper: HeaderWrapper,
  Wrapper: Wrapper,
};
