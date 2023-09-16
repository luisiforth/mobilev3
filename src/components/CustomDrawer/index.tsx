import {
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';

import * as S from './styles';

export default function CustomDrawer(props: DrawerContentComponentProps) {
  return (
    <S.Root.Wrapper>
      <DrawerContentScrollView>
        <DrawerItemList {...props} />
      </DrawerContentScrollView>

      {/* <Image style={styles.title}> TESTE </Image> */}
    </S.Root.Wrapper>
  );
}
