import { HeaderProps } from './types/header-type';

import * as S from './styles';

type HeaderWrapper = Pick<HeaderProps, 'children'>;

export function HeaderYStack({ children }: HeaderWrapper) {
  return <S.Root.YStack>{children}</S.Root.YStack>;
}
