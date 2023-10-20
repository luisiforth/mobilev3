import { DefaultTheme } from 'styled-components';

export function handleSectionOptions(value: string, theme: DefaultTheme) {
  if (value === 'PRODUÇÃO PAUSADA') {
    return {
      icon: 'pause',
      color: theme.colors.orange.button,
    };
  }
  return {
    icon: 'check',
    color: 'white',
  };
}

export function handleButtonOptions(value: string, theme: DefaultTheme) {
  if (value === '1') {
    return {
      text: 'Salvar',
      color: theme.colors.blue.button,
    };
  }

  return {
    text: 'Pausar',
    color: theme.colors.orange.button,
  };
}
