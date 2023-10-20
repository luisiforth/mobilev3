import { DefaultTheme } from 'styled-components';

export function handleSectionOptions(value: string, theme: DefaultTheme) {
  if (value === 'EM PRODUÇÃO' || value === 'EM PRODUCAO') {
    return {
      icon: 'play',
      color: theme.colors.blue.button,
    };
  }

  return {
    icon: 'check',
    color: theme.colors.green.button,
  };
}
