import React, { useRef, useState } from 'react';
import { View, Text, Pressable, LayoutAnimation } from 'react-native';

import { FlashList } from '@shopify/flash-list';

const List = () => {
  const [data, setData] = useState([1, 2, 3, 4, 5]);
  const [data2, setData2] = useState();

  const list = useRef<FlashList<number> | null>(null);

  const removeItem = (item: number) => {
    data.filter((dataItem) => {
      return dataItem == item;
    });

    setData2(data);
    list.current?.recordInteraction();

    // LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  };

  const renderItem = ({ item }: { item: number }) => {
    return (
      <Pressable
        onPress={() => {
          removeItem(item);
        }}
      >
        <View>
          <Text style={{ color: data2 == item ? 'red' : 'blue' }}>
            Cell Id: {item}
          </Text>
        </View>
      </Pressable>
    );
  };

  return (
    <FlashList
      // Saving reference to the `FlashList` instance to later trigger `prepareForLayoutAnimationRender` method.
      ref={list}
      // This prop is necessary to uniquely identify the elements in the list.
      keyExtractor={(item: number) => {
        return item.toString();
      }}
      renderItem={renderItem}
      estimatedItemSize={100}
      data={data}
    />
  );
};

export default List;
