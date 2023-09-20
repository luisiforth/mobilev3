import { View, StyleSheet } from 'react-native';

import { Card } from '@/components/Card';
import { CardModules } from '@/components/CardModules';
import { Header } from '@/components/Header';
import Search from '@/components/Search';
import { fontSizes } from '@/constants';
import { useModalContext } from '@/hooks/modalOpenContext';

import { Modal } from './components/modal';

export default function Home() {
  const { isModalOpen } = useModalContext();

  return (
    <>
      <View style={styles.container}>
        <Header.Wrapper>
          <Header.YStack>
            <Header.Options type="filter" />
            <Header.Options type="menu" />
          </Header.YStack>
          <Header.YStack>
            <View>
              <Header.Text text="Olá" />
              <Header.Title title="Teste (Não inativar)" />
            </View>
            {/* <Header.Image src="" /> */}
          </Header.YStack>
        </Header.Wrapper>
        <Search placeholder="Buscar ..." />
        <Card.Wrapper>
          <Card.Header>
            <Card.Title title="Mais acessados" />
          </Card.Header>
          <Card.Container>
            <CardModules.Wrap>
              <CardModules.Wrapper href={'/advanced-piece/'}>
                <CardModules.Icon icon="camera" />
                <CardModules.Title title="Peça Adiantada" />
              </CardModules.Wrapper>
            </CardModules.Wrap>
          </Card.Container>
        </Card.Wrapper>
      </View>
      {isModalOpen && <Modal />}
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    gap: 20,
    padding: 20,
  },
  text: {
    fontSize: fontSizes.sm,
  },
});
