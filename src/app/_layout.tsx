import { TouchableWithoutFeedback, Keyboard } from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'react-native-get-random-values';
import { HeaderMessage } from '@/components/Header/HeaderMessage';
import { useNetInfo } from '@/hooks/useNetInfo';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import { Slot } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import styled, { ThemeProvider } from 'styled-components/native';
import { RealmProvider } from 'util/realm';

import theme from '@/styles/theme';

const queryClient = new QueryClient();

export default function GlobalLayout() {
  const isConnected = useNetInfo();
  return (
    <RealmProvider>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <StatusBar style="light" translucent />
          {!isConnected && <HeaderMessage text="Você está offline" />}
          <TouchableWithoutFeedback
            onPress={Keyboard.dismiss}
            accessible={false}
          >
            <View>
              <BottomSheetModalProvider>
                <Slot />
              </BottomSheetModalProvider>
            </View>
          </TouchableWithoutFeedback>
        </ThemeProvider>
      </QueryClientProvider>
    </RealmProvider>
  );
}

export const View = styled.View`
  flex: 1;
`;
