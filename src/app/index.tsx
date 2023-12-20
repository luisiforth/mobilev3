import { useState } from 'react';
import { StyleSheet } from 'react-native';

import { Video, ResizeMode, AVPlaybackStatus } from 'expo-av';
import { Redirect } from 'expo-router';
import { hideAsync, preventAutoHideAsync } from 'expo-splash-screen';
import { StatusBar } from 'expo-status-bar';

export default function App() {
  // const [splashComplete, setSplashComplete] = useState(false);
  return (
    <>
      <StatusBar hidden />
      <Redirect href={'/(auth)/sign-in'} />
    </>
  );
}
