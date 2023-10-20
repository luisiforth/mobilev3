import { PressableProps } from 'react-native';
import {
  FadeInUp,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import * as S from './styles';

type CardModulesProps = {
  index?: number;
  children: React.ReactNode;
} & PressableProps;

export default function CameraPreviewsRoot({
  children,
  index = 0,
  ...props
}: CardModulesProps) {
  const scale = useSharedValue(1);
  const animatedContainerStyle = useAnimatedStyle(() => {
    return {
      transform: [{ scale: scale.value }],
    };
  });

  function onPressIn() {
    scale.value = withTiming(1.04);
  }

  function onPressOut() {
    scale.value = withTiming(1);
  }

  return (
    <S.Root.Wrapper
      entering={FadeInUp.delay(100 * index)}
      onPressIn={onPressIn}
      onPressOut={onPressOut}
      style={[animatedContainerStyle]}
      {...props}
    >
      {children}
    </S.Root.Wrapper>
  );
}
