import { memo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Dimensions } from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

import { TextInput } from '@/components/TextInput';

import { InputTwoStep } from '../../InputStepTwo';

interface StepProps {
  methods: UseFormReturn;
  onRequired: (value?: unknown) => boolean;
}

type TDefects = {
  label: string;
  ID: number;
};

const { width } = Dimensions.get('screen');

export const StepTwo = ({ methods, onRequired }: StepProps) => {
  return (
    <ScrollView
      keyboardShouldPersistTaps={'handled'}
      style={{ height: width * 0.38, zIndex: 100 }}
    >
      {methods.getValues('values')?.map((v: TDefects, index: number) => (
        <>
          <TextInput.Wrapper required label={v.label} />
          <InputTwoStep
            onRequired={onRequired}
            methods={methods}
            index={index}
          />
        </>
      ))}
    </ScrollView>
  );
};

export default memo(StepTwo);
