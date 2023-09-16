import { CardModulesProps } from './types/card-type';

import * as S from './styles';

type CardModulesWrapperProps = Pick<CardModulesProps, 'children'>;

export function CardModulesWrap({ children }: CardModulesWrapperProps) {
  return <S.Root.Wrap>{children}</S.Root.Wrap>;
}
