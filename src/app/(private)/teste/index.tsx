import { View, StyleSheet } from 'react-native';

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
          <Header.Title title="TESTE (Não Inativar)" />
        </View>
      </Header.Wrapper>
      <Search placeholder="Buscar ..." />

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
