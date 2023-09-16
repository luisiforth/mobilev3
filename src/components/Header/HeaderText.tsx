import { HeaderProps } from './types/header-type';

import * as S from './styles';

type HeaderTextProps = Pick<HeaderProps, 'text'>;

export function HeaderText({ text }: HeaderTextProps) {
  return <S.Root.Text>{text}</S.Root.Text>;
}
