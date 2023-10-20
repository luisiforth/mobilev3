import { useCallback } from 'react';

import { Feather } from '@expo/vector-icons';
import { useTheme } from 'styled-components/native';

import * as S from './styles';

export type Href = Record<'pathname', string>;

type InputProps = {
  isInactivatedItem?: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onPress?: (value?: any) => void;
};

export default function CardStopIcon({
  isInactivatedItem = false,
  onPress,
}: InputProps) {
  const theme = useTheme();

  const handleColor = useCallback(() => {
    if (isInactivatedItem) {
      return theme.colors.orange[500];
    }
    return 'black';
  }, [isInactivatedItem]);

  return (
    //@ts-ignore
    <S.Root.WrapperIcon isInactivatedItem={isInactivatedItem}>
      <Feather
        onPress={onPress}
        name={isInactivatedItem ? 'x' : 'check'}
        size={30}
        color={handleColor()}
      />
      {/* @ts-ignore */}
      <S.Root.TextData color={handleColor}>
        {isInactivatedItem ? 'Cancelado' : 'Ativo'}
      </S.Root.TextData>
    </S.Root.WrapperIcon>
  );
}
