import theme from '@/styles/theme';
import 'styled-components/native';

declare module 'styled-components/native' {
  type Theme = typeof theme;
  export interface DefaultTheme extends Theme {}
}
