import { CardModulesProps } from './types/card-type';

import * as S from './styles';

type CardModulesTitleProps = Pick<CardModulesProps, 'title'>;

export function CardModulesTitle({ title }: CardModulesTitleProps) {
  return (
    <S.Root.SkeletonText
      stopAutoRun={!!title}
      location={[0.4, 0.8, 1]}
      visible={!!title}
    >
      <S.Root.Title>{title}</S.Root.Title>
    </S.Root.SkeletonText>
  );
}
