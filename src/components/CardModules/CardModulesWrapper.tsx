import { CardModulesProps } from './types/card-type';

import * as S from './styles';

type CardModulesWrapperProps = Pick<CardModulesProps, 'children' | 'fn'>;

export function CardModulesWrapper({ children, fn }: CardModulesWrapperProps) {
  return (
    <S.Root.Wrapper activeOpacity={0.6} onPress={fn}>
      {children}
    </S.Root.Wrapper>
  );
}
