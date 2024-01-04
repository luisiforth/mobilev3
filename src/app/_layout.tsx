import {
  TouchableWithoutFeedback,
  Keyboard,
  TouchableOpacity,
} from 'react-native';
import { QueryClient, QueryClientProvider } from 'react-query';

import 'react-native-get-random-values';
import { HeaderMessage } from '@/components/Header/HeaderMessage';
import { breakpoints } from '@/constants';
import { darkTheme, lightTheme } from '@/constants/theme';
import { AuthProvider } from '@/context/authContext';
import { useNetInfo } from '@/hooks/useNetInfo';
import { Feather } from '@expo/vector-icons';
import { BottomSheetModalProvider } from '@gorhom/bottom-sheet';
import axios from 'axios';
import { Stack, router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import styled, { ThemeProvider } from 'styled-components/native';
import { RealmProvider } from 'util/realm';

import { UnistylesRegistry } from 'react-native-unistyles';

import theme from '@/styles/theme';

const queryClient = new QueryClient();

export default function GlobalLayout() {
  const isConnected = useNetInfo();

  UnistylesRegistry.addBreakpoints(breakpoints)
    .addThemes({
      dark: darkTheme,
      light: lightTheme,
    })
    .addConfig({ initialTheme: 'light' });

  axios.interceptors.response.use(
    (response) => response,
    (error) => {
      console.log('Axios Error:', error);
      if (error.response && error.response.status === 401) {
        console.log('Unauthorized error (401)');
      }
      return Promise.reject(error);
    }
  );

  return (
    <AuthProvider>
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
                  <Stack
                    screenOptions={{
                      animation: 'slide_from_right',
                      contentStyle: {
                        backgroundColor: '#f7fafc',
                      },
                      headerShadowVisible: false,
                      headerShown: false,
                      headerStyle: {
                        backgroundColor: '#f7fafc',
                      },
                      title: '',
                    }}
                  >
                    <Stack.Screen
                      name="(auth)/config"
                      options={{
                        headerLeft: () => (
                          <TouchableOpacity
                            activeOpacity={1}
                            hitSlop={35}
                            onPress={() => router.back()}
                          >
                            <Feather
                              name="arrow-left"
                              color={'black'}
                              size={25}
                            />
                          </TouchableOpacity>
                        ),
                        headerShown: true,
                      }}
                    />
                  </Stack>
                </BottomSheetModalProvider>
              </View>
            </TouchableWithoutFeedback>
          </ThemeProvider>
        </QueryClientProvider>
      </RealmProvider>
    </AuthProvider>
  );
}

export const View = styled.View`
  flex: 1;
`;
