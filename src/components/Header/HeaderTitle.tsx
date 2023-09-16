import { HeaderProps } from './types/header-type';

import * as S from './styles';

type HeaderTitleProps = Pick<HeaderProps, 'title'>;

export function HeaderTitle({ title }: HeaderTitleProps) {
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
