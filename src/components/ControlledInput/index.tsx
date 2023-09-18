import React from 'react';
import { Controller, Control } from 'react-hook-form';

import { TextInput } from '../TextInput';
import { InputProps } from '../TextInput/InputContent';

// import * as S from './styles';
type Props = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  control: Control<any>;
  name: string;
} & InputProps;

export function ControlledInput({ control, name, ...props }: Props) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextInput.Content onChangeText={onChange} value={value} {...props} />
      )}
    />
  );
}
