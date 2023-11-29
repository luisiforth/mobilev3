import { UseFormReturn } from 'react-hook-form';
import { View } from 'react-native';

import { ControlledInput } from '@/components/ControlledInput';
import { TextInput } from '@/components/TextInput';
import { useOnRequired } from '@/hooks/useOnRequired';

interface StepProps {
  methods: UseFormReturn;
  onRequired: (value?: unknown) => boolean;
}
export const StepThree = ({ methods, onRequired }: StepProps) => {
  useOnRequired(['sample', 'tone'], {
    methods,
    onRequired,
  });

  return (
    <View style={{ gap: 10 }}>
      <TextInput.Wrapper required label="Amostra">
        <ControlledInput
          control={methods.control}
          keyboardType="numeric"
          name="sample"
        />
      </TextInput.Wrapper>
      <TextInput.Wrapper required label="Tom">
        <ControlledInput
          control={methods.control}
          keyboardType="numeric"
          name="tone"
        />
      </TextInput.Wrapper>
      <TextInput.Wrapper label="Tonalindade/Lote">
        <ControlledInput control={methods.control} name="tonality" />
      </TextInput.Wrapper>
    </View>
  );
};
