import { CardModulesProps } from './types/card-type';

import * as S from './styles';

type CardModulesIconProps = Pick<CardModulesProps, 'icon'>;

export function CardModulesIcon({ icon }: CardModulesIconProps) {
  return (
    <S.Root.SkeletonIcon
      stopAutoRun={!!icon}
      location={[0.4, 0.8, 1]}
      visible={!!icon}
    >
      <S.Root.Icon name={icon} />
    </S.Root.SkeletonIcon>
  );
}
