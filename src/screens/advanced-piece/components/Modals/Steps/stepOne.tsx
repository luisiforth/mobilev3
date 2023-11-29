import { FieldErrors, UseFormReturn } from 'react-hook-form';

import { ControlledInput } from '@/components/ControlledInput';
import { Selects } from '@/components/ControlledSelect';
import { Select } from '@/components/Select';
import { TextInput } from '@/components/TextInput';
import { useOnRequired } from '@/hooks/useOnRequired';
import { item } from '@/screens/advanced-piece/utils/object_item';

import { schema } from '../schema';

import * as S from '@/screens/advanced-piece/styles';

interface StepProps {
  methods: UseFormReturn;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  errors: FieldErrors<typeof schema.fields>;
  onRequired: (value?: unknown) => boolean;
}

export const StepOne = ({ methods, errors, onRequired }: StepProps) => {
  useOnRequired(['tom', 'tonality', 'texture', 'shine'], {
    methods,
    onRequired,
  });

  return (
    <S.Root.WrapperSteps>
      <TextInput.Wrapper error={errors.tom?.message} label="Tom *">
        <ControlledInput
          name="tom"
          control={methods.control}
          keyboardType="number-pad"
          placeholder="Insira o valor da tom"
        />
      </TextInput.Wrapper>

      <Select.Wrapper error={errors.tonality?.message} label="Tonalidade *">
        <Selects.Normal
          item={item}
          placeholder="Selecione a tonalidade"
          control={methods.control}
          name="tonality"
        />
      </Select.Wrapper>

      <Select.Wrapper error={errors.texture?.message} label="Textura *">
        <Selects.Normal
          item={item}
          placeholder="Selecione a textura"
          control={methods.control}
          name="texture"
        />
      </Select.Wrapper>

      <Select.Wrapper error={errors.shine?.message} label="Brilho *">
        <Selects.Normal
          item={item}
          control={methods.control}
          placeholder="Selecione o brilho"
          name="shine"
        />
      </Select.Wrapper>
    </S.Root.WrapperSteps>
  );
};
