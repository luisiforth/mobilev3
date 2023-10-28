import React from 'react';
import { Controller, Control } from 'react-hook-form';

import { TextInput } from '../TextInput';
import { InputProps } from '../TextInput/InputContent';

// import * as S from './styles';
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onValueChanged?: (val: any) => void;
} & InputProps;

export function ControlledInputModal({
  onValueChanged,
  control,
  name,
  ...props
}: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextInput.InputModal
          onChangeText={(val) => {
            onChange(val);
            if (onValueChanged) {
              onValueChanged(val);
            }
          }}
          value={value}
          {...props}
        />
      )}
    />
  );
}
