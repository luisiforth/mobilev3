import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Redirect } from 'expo-router';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

type Types = {
  onComplete: (status: boolean) => void;
};

export function Splash({ onComplete }: Types) {
  const [lastStatus, setStatus] = useState<AVPlaybackStatus>(
    {} as AVPlaybackStatus
  );
  function onPlaybackStatusUpdate(status: AVPlaybackStatus) {
    if (status.isLoaded) {
      if (lastStatus.isLoaded !== status.isLoaded) {
        hideAsync();
      }

      if (status.didJustFinish) {
        onComplete(true);
      }
    }

    setStatus(() => status);
  }
  return (
    <Video
      style={StyleSheet.absoluteFill}
      resizeMode={ResizeMode.COVER}
      source={require('../../assets/splash.mp4')}
      isLooping={false}
      onPlaybackStatusUpdate={onPlaybackStatusUpdate}
      shouldPlay={true}
    />
  );
}

preventAutoHideAsync();
export default function App() {
  const [splashComplete, setSplashComplete] = useState(false);
  return (
    <>
      <StatusBar hidden />
      {!splashComplete ? (
        <Splash onComplete={setSplashComplete} />
      ) : (
        <Redirect href={'/(auth)/sign-in'} />
      )}
    </>
  );
}
