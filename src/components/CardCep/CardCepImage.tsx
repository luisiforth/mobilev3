import * as S from './styles';

type CardCepRootSpanProps = {
  url: string[];
};

export function CardCepImage({ url }: CardCepRootSpanProps) {
  return <S.Root.Image source={{ uri: 'data:image/png;base64, ' + url }} />;
}
