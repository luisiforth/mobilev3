import { memo } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Dimensions } from 'react-native';
import {
  NativeViewGestureHandler,
  ScrollView,
} from 'react-native-gesture-handler';

import { TextInput } from '@/components/TextInput';
import { TouchableOpacity } from '@gorhom/bottom-sheet';

import { InputTwoStep } from '../../InputStepTwo';

interface StepProps {
  methods: UseFormReturn;
  onRequired: (value?: unknown) => boolean;
}

type TDefects = {
  LABEL: string;
  ID: number;
};

const { width } = Dimensions.get('screen');

export const StepTwo = ({ methods, onRequired }: StepProps) => {
  return (
    <NativeViewGestureHandler disallowInterruption={true}>
      <ScrollView style={{ height: width * 0.38 }}>
        {methods.getValues('values')?.map((v: TDefects, index: number) => (
          <TouchableOpacity
            activeOpacity={1}
            key={index}
            style={{ marginBottom: 20 }}
          >
            <TextInput.Wrapper required label={v.LABEL} />
            <InputTwoStep
              onRequired={onRequired}
              methods={methods}
              index={index}
            />
          </TouchableOpacity>
        ))}
      </ScrollView>
    </NativeViewGestureHandler>
  );
};

export default memo(StepTwo);
