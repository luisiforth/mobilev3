import { FieldErrors, UseFormReturn } from 'react-hook-form';

import { ControlledInput } from '@/components/ControlledInput';
import { Selects } from '@/components/ControlledSelect';
import { Select } from '@/components/Select';
import { TextInput } from '@/components/TextInput';
import { useOnRequired } from '@/hooks/useOnRequired';
import { item } from '@/screens/advanced-piece/utils/object_item';
import { useDefectsStore } from '@/store/filterStore';

import { schema } from '../schema';

import * as S from '@/screens/advanced-piece/styles';

interface StepProps {
  methods: UseFormReturn;
  errors: FieldErrors<typeof schema.fields>;
  onRequired: (value?: unknown) => boolean;
}

export const StepTwo = ({ methods, errors, onRequired }: StepProps) => {
  const { defects } = useDefectsStore();
  useOnRequired(['tom', 'tonality', 'texture', 'shine'], {
    methods,
    onRequired,
  });

  return (
    <S.Root.WrapperSteps>
      <Select.Wrapper error={errors.defect?.message} label="Defeito *">
        <Selects.Normal
          item={defects}
          control={methods.control}
          placeholder="Selecione um defeito"
          name="defect"
        />
      </Select.Wrapper>

      <TextInput.Wrapper
        error={errors.observation?.message}
        label="Observação do Defeito"
      >
        <ControlledInput
          name="observation"
          multiline
          control={methods.control}
          placeholder="Insira uma observação do defeito"
        />
      </TextInput.Wrapper>

      <Select.Wrapper error={errors.deformity?.message} label="Deformidade *">
        <Selects.Normal
          item={item}
          control={methods.control}
          placeholder="Selecione uma deformidade"
          name="deformity"
        />
      </Select.Wrapper>

      <Select.Wrapper
        error={errors.diff?.message}
        label="Diferença de tonalidade da mesma peça *"
      >
        <Selects.Normal
          item={item}
          control={methods.control}
          placeholder="Selecione um valor"
          name="diff"
        />
      </Select.Wrapper>
    </S.Root.WrapperSteps>
  );
};
