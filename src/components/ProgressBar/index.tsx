import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import * as S from './styles';

interface Props {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: Props) {
  const percentage = Math.round((current / total) * 90);

  const sharedProgress = useSharedValue(percentage);

  useEffect(() => {
    sharedProgress.value = withTiming(percentage);
  }, [current]);

  const styledAnimated = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    };
  });

  return (
    <S.Root.Wrapper>
      <Animated.View style={[styles.progress, styledAnimated]} />
      <Text>
        {current}/{total}
      </Text>
    </S.Root.Wrapper>
  );
}

export const styles = StyleSheet.create({
  progress: {
    height: 8,
    backgroundColor: 'black',
    borderRadius: 8,
  },
});
