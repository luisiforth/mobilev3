import { memo } from 'react';
import {
  FlatList,
  ImageStyle,
  ScrollView,
  TextStyle,
  TouchableOpacity,
  StyleSheet,
  View,
  ViewStyle,
  Text,
  ListRenderItem,
} from 'react-native';

import { COLORS } from '@/constants';

type TTableOption<ItemT> = {
  data: [];
  head: string[];
  renderItem: ListRenderItem<ItemT> | null | undefined;
  setState: (value: any) => void;
  state: any;
};
export type TStyles = {
  spaceCell: (index: number) => ViewStyle | TextStyle | ImageStyle;
  cellSituation: (value: boolean) => ViewStyle | TextStyle | ImageStyle;
};
function Table<ItemT>(props: TTableOption<ItemT>) {
  const { renderItem, data, head } = props;
  return (
    <ScrollView
      disableIntervalMomentum
      horizontal
      showsHorizontalScrollIndicator={false}
    >
      <TouchableOpacity activeOpacity={0.9} style={{ zIndex: 0 }}>
        <View style={styles.header}>
          {head.map((value, index) => (
            <Text key={index} style={styles.headerItem}>
              {value}
            </Text>
          ))}
        </View>
        <FlatList<ItemT>
          style={{ flex: 1 }}
          data={data || []}
          renderItem={renderItem}
        />
      </TouchableOpacity>
    </ScrollView>
  );
}

export default memo(Table) as <ItemT>(
  props: TTableOption<ItemT>
) => JSX.Element;

export const styles = StyleSheet.create<TStyles | any>({
  cellSituation: (isActive: boolean): ViewStyle => ({
    backgroundColor: isActive ? COLORS.orange.situation : 'transparent',
    padding: 14,
  }),
  header: {
    alignItems: 'center',
    backgroundColor: COLORS.primary[400],
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 10,
  },
  headerItem: {
    borderColor: 'black',
    color: 'white',
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
    width: 300,
  },
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    height: 50,
    justifyContent: 'center',
  },
});
