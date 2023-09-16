import { useRef, useCallback, useState } from 'react';
import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';

import { COLORS, radius, spaces } from '@/constants';
import { Feather } from '@expo/vector-icons';
import styled from 'styled-components/native';

type SearchProps = {
  placeholder: string;
  onChangeText?: (text: string) => void;
};

export default function Search({ placeholder }: SearchProps) {
  const inputRef = useRef<TextInput>(null);
  const [isFocused, setIsFocused] = useState(false);

  const handleSelectedInput = useCallback(() => {
    inputRef.current?.focus();
    setIsFocused(true);
  }, []);

  const handleBlur = useCallback(() => {
    setIsFocused(false);
  }, []);

  const containerStyle = isFocused ? [style.input, style.focused] : style.input;

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={handleSelectedInput}
      style={containerStyle}
    >
      <TextInput
        ref={inputRef}
        onBlur={handleBlur}
        maxLength={29}
        placeholder={placeholder}
      />
      <Feather name="search" size={25} />
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  focused: {
    borderColor: COLORS.primary.ring,
  },

  input: {
    alignItems: 'center',
    borderColor: COLORS.black,
    borderRadius: radius[16],
    borderWidth: 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: spaces[10],
    paddingLeft: spaces[10],
    paddingRight: spaces[10],
  },
});

const focused = styled.TouchableOpacity``;

export const Root = {
  focused: focused,
};
