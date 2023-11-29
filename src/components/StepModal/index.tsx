import React, { useCallback, useState } from 'react';
import { FieldValues, useForm } from 'react-hook-form';
import { ActivityIndicator } from 'react-native';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import { ProgressBar } from '@/components/ProgressBar';
import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import { AxiosResponse } from 'axios';
import * as Yup from 'yup';

import * as S from './styles';

interface StepModalProps<DataFormT extends FieldValues, DataRequestT> {
  schema: Yup.ObjectSchema<FieldValues>;
  onSubmit: (
    data: DataFormT
  ) => Promise<AxiosResponse<DataRequestT[], any> | undefined>;
  steps: React.ElementType[];
  defaultValue?: any;
}

export default function StepModal<
  DataFormT extends FieldValues,
  DataRequestT = any,
>({
  schema,
  onSubmit,
  steps,
  defaultValue,
}: StepModalProps<DataFormT, DataRequestT>) {
  const [currentStep, setCurrentStep] = useState(1);
  const [areRequiredFieldFilled, setAreRequiredFieldsFilled] = useState(false);
  const handleAreRequiredFieldsFilled = (value: boolean) => {
    return value
      ? setAreRequiredFieldsFilled(value)
      : setAreRequiredFieldsFilled((prev) => !prev);
  };

  const methods = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(schema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  // console.log(errors);

  const componentElement = steps.map((Component, index) => (
    <Component
      key={index}
      onRequired={handleAreRequiredFieldsFilled}
      control={control}
      methods={methods}
      errors={errors}
    />
  ));

  const handleBack = useCallback(() => {
    if (currentStep === 1) return;
    setCurrentStep(currentStep - 1);
  }, [currentStep]);

  const handleNext = useCallback(() => {
    if (currentStep == steps.length) return;
    setCurrentStep((currentStep) => currentStep + 1);
  }, [currentStep, steps.length]);

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <KeyboardAvoidingView enabled>
        <S.Root.Wrapper>
          <ProgressBar total={steps.length} current={currentStep} />
          {componentElement[currentStep - 1]}
          <S.Root.Content>
            {currentStep > 1 && (
              <S.Root.Button activeOpacity={0.9} onPress={handleBack}>
                <Feather name="chevron-left" size={25} color={'white'} />
                <S.Root.Text>Voltar</S.Root.Text>
              </S.Root.Button>
            )}
            {currentStep != steps.length && (
              <S.Root.Button
                disabled={areRequiredFieldFilled}
                activeOpacity={0.9}
                onPress={handleNext}
              >
                <S.Root.Text>Próximo</S.Root.Text>
                <Feather name="chevron-right" size={25} color={'white'} />
              </S.Root.Button>
            )}
            {currentStep == steps.length && (
              <S.Root.Button
                //@ts-ignore
                finalStep
                disabled={
                  areRequiredFieldFilled || methods.formState.isSubmitting
                }
                activeOpacity={0.9}
                onPress={handleSubmit(onSubmit)}
              >
                {methods.formState.isSubmitting ? (
                  <ActivityIndicator color={'white'} />
                ) : (
                  <>
                    <S.Root.Text>Enviar</S.Root.Text>
                    <Feather
                      name="check"
                      size={25}
                      color={'white'}
                      style={{ marginHorizontal: 5 }}
                    />
                  </>
                )}
              </S.Root.Button>
            )}
          </S.Root.Content>
        </S.Root.Wrapper>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
