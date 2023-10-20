import * as S from './styles';

type CardCepRootProps = {
  text: string | number;
  title?: string;
};

export default function CardStopText({ text, title }: CardCepRootProps) {
  return (
    <S.Root.Text>
      <S.Root.Title>{title}</S.Root.Title>
      {text}
    </S.Root.Text>
  );
}
