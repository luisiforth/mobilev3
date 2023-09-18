import { Link } from 'expo-router';

import { CardModulesProps } from './types/card-type';

import * as S from './styles';

type CardModulesWrapperProps = Pick<CardModulesProps, 'children' | 'href'>;

export function CardModulesWrapper({
  children,
  href,
}: CardModulesWrapperProps) {
  return (
    <Link href={href} asChild>
      <S.Root.Wrapper
        // onPress={() => router?.navigate('advanced-piece')}
        activeOpacity={0.6}
      >
        {children}
      </S.Root.Wrapper>
    </Link>
  );
}
