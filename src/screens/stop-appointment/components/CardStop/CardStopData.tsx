import * as S from './styles';

type CardCepRootProps = {
  text: string | number;
  title?: string;
};

export default function CardStopData({ text, title }: CardCepRootProps) {
  return (
    <S.Root.TextData>
      <S.Root.TextTitle>{title}</S.Root.TextTitle>
      {text}
    </S.Root.TextData>
  );
}
