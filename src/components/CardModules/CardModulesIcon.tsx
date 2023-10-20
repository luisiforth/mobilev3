import { useTheme } from 'styled-components/native';

import { CardModulesProps } from './types/card-type';

import * as S from './styles';

type CardModulesIconProps = Pick<CardModulesProps, 'icon'>;

export function CardModulesIcon({ icon }: CardModulesIconProps) {
  const theme = useTheme();
  return (
    <S.Root.SkeletonIcon
      stopAutoRun={!!icon}
      location={[0.4, 0.8, 1]}
      visible={!!icon}
    >
      <S.Root.Icon name={icon} color={theme.colors.primary[500]} size={25} />
    </S.Root.SkeletonIcon>
  );
}
