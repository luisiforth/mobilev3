import { HeaderProps } from './types/header-type';

import * as S from './styles';

type HeaderImageProps = Pick<HeaderProps, 'src'>;

export function HeaderImage({ src = undefined }: HeaderImageProps) {
  return (
    <>
      <S.Root.SkeletonAvatar
        stopAutoRun={!!src}
        visible={!!src}
        location={[0.4, 0.8, 1]}
      >
        <S.Root.BorderImage>
          <S.Root.Image
            source={{
              uri: src,
            }}
          />
        </S.Root.BorderImage>
      </S.Root.SkeletonAvatar>
    </>
  );
}
