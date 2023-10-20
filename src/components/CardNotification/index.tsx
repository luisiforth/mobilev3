// import { SvgUri } from 'react-native-svg';

// import SVGImage from '../../assets/images/svg/teste.svg';

import * as S from './styles';
type CardNotificationProps = {
  data: any;
};

export default function CardNotification({ data }: CardNotificationProps) {
  return (
    <S.Root.ShimmerPlaceholderStyleContainer
      stopAutoRun={!!data}
      visible={!!data}
      location={[0.4, 0.8, 1]}
    >
      <S.Root.Wrapper>
        {/* <SVGImage width={180} height={150} /> */}
        {/* <SvgUri uri={'../../assets/images/svg/teste.svg'} /> */}
      </S.Root.Wrapper>
    </S.Root.ShimmerPlaceholderStyleContainer>
  );
}
