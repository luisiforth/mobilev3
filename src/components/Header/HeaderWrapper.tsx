import { HeaderProps } from './types/header-type';

import * as S from './styles';

type HeaderWrapper = Pick<HeaderProps, 'children'>;

export function HeaderWrapper({ children }: HeaderWrapper) {
  return <S.Root.Wrapper>{children}</S.Root.Wrapper>;
}
