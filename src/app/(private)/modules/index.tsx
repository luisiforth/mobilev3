import { View, StyleSheet } from 'react-native';

import { CardModules } from '@/components/CardModules';
import { Header } from '@/components/Header';
import Search from '@/components/Search';
import { fontSizes } from '@/constants';
import { VictoryPie } from 'victory-native';

export default function Home() {
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

      <CardModules.Wrap>
        <CardModules.Wrapper>
          <CardModules.Icon icon="camera" />
          <CardModules.Title title="Peça Adiantada" />
        </CardModules.Wrapper>

        <CardModules.Wrapper>
          <CardModules.Icon icon="alert-circle" />
          <CardModules.Title title="Teste" />
        </CardModules.Wrapper>
      </CardModules.Wrap>
      <View style={{ alignItems: 'center' }}>
        <VictoryPie data={[20, 30, 40]} />
      </View>
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
