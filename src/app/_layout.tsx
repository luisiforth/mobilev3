import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import { ModalProvider } from '@/hooks/modalOpenContext';
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
            <ModalProvider>
              <Slot />
            </ModalProvider>
          </View>
        </TouchableWithoutFeedback>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export const View = styled.View`
  flex: 1;
`;
