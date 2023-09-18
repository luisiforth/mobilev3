import { TouchableOpacityProps } from 'react-native';

import { Link, useRootNavigation } from 'expo-router';

import { CardModulesProps } from './types/card-type';

import * as S from './styles';

type CardModulesWrapperProps = Pick<CardModulesProps, 'children'> &
  TouchableOpacityProps;

export function CardModulesWrapper({ children }: CardModulesWrapperProps) {
  // const router = useRootNavigation();
  return (
    <Link href={'/advanced-piece/'} asChild>
      <S.Root.Wrapper
        // onPress={() => router?.navigate('advanced-piece')}
        activeOpacity={0.6}
      >
        {children}
      </S.Root.Wrapper>
    </Link>
  );
}
