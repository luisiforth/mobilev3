import React, { useEffect } from 'react';
import { StyleSheet, Text } from 'react-native';
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from 'react-native-reanimated';

import * as S from './styles';
import { useTheme } from 'styled-components/native';

interface Props {
  total: number;
  current: number;
}

export function ProgressBar({ total, current }: Props) {
  const percentage = Math.round((current / total) * 90);
  const theme = useTheme();
  const sharedProgress = useSharedValue(percentage);

  useEffect(() => {
    sharedProgress.value = withTiming(percentage);
  }, [current]);

  const styledAnimated = useAnimatedStyle(() => {
    return {
      width: `${sharedProgress.value}%`,
    };
  });

  const styles = StyleSheet.create({
    progress: {
      backgroundColor: theme.colors.primary[200],
      borderRadius: 8,
      height: 5,
    },
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
