import { CardModulesProps } from './types/card-type';

import * as S from './styles';

type CardModulesWrapperProps = Pick<CardModulesProps, 'children' | 'data'>;

export function CardModulesWrap({ children }: CardModulesWrapperProps) {
  if (data) return <S.Root.Wrap>{children}</S.Root.Wrap>;
}
