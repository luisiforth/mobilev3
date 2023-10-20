import { Pressable } from 'react-native';
import Animated from 'react-native-reanimated';

import { Image } from 'expo-image';
import styled from 'styled-components/native';

const AnimetedPressable = Animated.createAnimatedComponent(Pressable);

type IconProps = {
  isCameraShot: boolean;
};

const Wrapper = styled(AnimetedPressable)`
  align-items: center;
  border-radius: 6px;
  height: fit-content;
  width: 100%;
  justify-content: center;
  border: 2px dashed ${({ theme }) => theme.colors.gray[300]};
  background: ${({ theme }) => theme.colors.gray[100]};
`;

const WrapperContent = styled(Image)`
  position: relative;
  align-items: center;
  margin-top: 30px;
  margin-left: 23px;
  border-radius: 6px;
  height: 400px;
  width: 250px;
`;

const Icon = styled.TouchableOpacity<IconProps>`
  position: ${({ isCameraShot }) => (isCameraShot ? 'relative' : 'absolute')};
  padding: ${({ isCameraShot }) => (isCameraShot ? '60px' : '2px')};
  top: 0;
  left: 270px;
  z-index: 99999;
`;

export const Root = {
  Icon: Icon,
  Wrapper: Wrapper,
  WrapperContent: WrapperContent,
};
