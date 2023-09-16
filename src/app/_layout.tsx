import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import styled, { ThemeProvider } from 'styled-components/native';

import theme from '@/styles/theme';

const queryClient = new QueryClient();

export default function GlobalLayout() {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <StatusBar style="light" translucent />
        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
          <View>
            <Slot />
          </View>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export const View = styled.View`
  flex: 1;
`;
