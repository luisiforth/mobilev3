import { Camera } from 'expo-camera';
import styled from 'styled-components/native';

const Wrapper = styled.View`
  /* flex: 1; */
  background-color: ${({ theme }) => theme.colors.gray[500]};
`;

const CameraStyled = styled(Camera)`
  width: 100%;
  height: 90%;

  justify-content: space-between;
`;

const WrapperOptionsCam = styled.View`
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  padding: ${({ theme }) => theme.spacings[20]};
`;

const Circle = styled.TouchableOpacity`
  width: 70px;
  height: 70px;
  border-radius: 1000px;
  background-color: red;
  border: 3px solid ${({ theme }) => theme.colors.gray[400]};
  margin: 20px auto;
`;

export const Root = {
  Circle: Circle,
  CameraStyled: CameraStyled,
  Wrapper: Wrapper,
  WrapperOptionsCam: WrapperOptionsCam,
};
