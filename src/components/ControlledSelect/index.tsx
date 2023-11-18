import React from 'react';
import { Controller, Control } from 'react-hook-form';
import { Keyboard } from 'react-native';

import { Picker, PickerProps } from '@react-native-picker/picker';
import { ItemValue } from '@react-native-picker/picker/typings/Picker';

type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  placeholder?: string;
  item: {
    label: string | number;
    value: string | number;
  }[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChanged?: (val: any) => void;
} & PickerProps<ItemValue>;

export function ControlledSelect({
  control,
  name,
  item,
  placeholder,
  onValueChanged,
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <Picker
          onFocus={() => Keyboard.dismiss()}
          selectedValue={value == undefined ? value : value.value}
          onValueChange={(val) => {
            const retorno = item.find((v) => val === v.value);

            onChange(retorno);
            if (onValueChanged) {
              onValueChanged(retorno);
            }
          }}
        >
          <Picker.Item
            label={placeholder || 'Selecione'}
            value={null}
            enabled={true}
          />
          {item.map((v, key) => (
            <Picker.Item key={key} label={v.label as string} value={v.value} />
          ))}
        </Picker>
      )}
    />
  );
}
