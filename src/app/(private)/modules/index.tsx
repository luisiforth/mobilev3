import { View, StyleSheet } from 'react-native';

import Button from '@/components/Button';
import { Card } from '@/components/Card';
import { CardModules } from '@/components/CardModules';
import { Header } from '@/components/Header';
import Search from '@/components/Search';
import { TextInput } from '@/components/TextInput';
import { fontSizes } from '@/constants';
import { useModalContext, CustomModal } from '@/hooks/modalOpenContext';

export default function Home() {
  const { toggleModal } = useModalContext();

  const testRoutes = [
    {
      name: 'Peça Adiantada',
      icon: 'camera',
      href: '/advanced-piece/',
    },
  ];

  return (
    <View style={styles.container}>
      <Header.Wrapper>
        <View>
          <Header.Text text="Olá" />
          <Header.Title title="Teste (Não inativar)" />
        </View>
        <Header.Image src="" />
      </Header.Wrapper>
      <Search placeholder="Buscar ..." />
      {/* <Button onPress={toggleModal} text="TESTE" /> */}

      <Card.Wrapper>
        <Card.Header>
          <Card.Title title="Mais acessados" />
        </Card.Header>
        <TextInput.Wrapper label="Teste">
          <TextInput.Content />
          <TextInput.Icon icon={'search'} />
        </TextInput.Wrapper>
        <Card.Container>
          <CardModules.Wrap>
            <CardModules.Wrapper href={'/advanced-piece/'}>
              <CardModules.Icon icon="camera" />
              <CardModules.Title title="Peça Adiantada" />
            </CardModules.Wrapper>

            <CardModules.Wrapper href={'/'}>
              <CardModules.Icon icon="alert-circle" />
              <CardModules.Title title="Teste" />
            </CardModules.Wrapper>
          </CardModules.Wrap>
        </Card.Container>
      </Card.Wrapper>
      <CustomModal>
        <Button onPress={toggleModal} text="TESTE" />
        {/* <StepModal onSubmit={() => null} schema={{}} steps={[]} /> */}
      </CustomModal>
    </View>
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
