import { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { View } from 'react-native';

import { TextInput } from '@/components/TextInput';

import { InputTwoStep } from '../../InputStepTwo';

interface StepProps {
  methods: UseFormReturn;
  onRequired: (value?: unknown) => boolean;
}

type TDefects = {
  LABEL: string;
  ID: number;
}[];

export const StepTwo = ({ methods, onRequired }: StepProps) => {
  const [defects, setDefects] = useState<TDefects>([]);

  useEffect(() => {
    setDefects(methods.getValues('values'));
  }, [defects]);

  return (
    <View>
      <View style={{ padding: 10, gap: 20 }}>
        {defects?.map((v, index) => (
          <View key={v.ID}>
            <TextInput.Wrapper required label={v.LABEL} />
            <InputTwoStep
              onRequired={onRequired}
              methods={methods}
              index={index}
            />
          </View>
        ))}
      </View>
    </View>
  );
};

export default StepTwo;
