import React, { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
  ActivityIndicator,
  LayoutRectangle,
} from 'react-native';

import { ProgressBar } from '@/components/ProgressBar';
import { Feather } from '@expo/vector-icons';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import * as S from './styles';
import { NativeSyntheticEvent } from 'react-native';

interface StepModalProps {
  schema: Yup.ObjectSchema<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
  steps: React.ElementType[];
}

export default function StepModal({ schema, onSubmit, steps }: StepModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [areRequiredFieldFilled, setAreRequiredFieldsFilled] = useState(false);
  const onContentLayout = (
    event: NativeSyntheticEvent<{ layout: LayoutRectangle }>
  ) => {
    const { height } = event.nativeEvent.layout;
    return height;
  };

  const handleAreRequiredFieldsFilled = (value: boolean) => {
    return value
      ? setAreRequiredFieldsFilled(value)
      : setAreRequiredFieldsFilled((prev) => !prev);
  };

  const methods = useForm({
    resolver: yupResolver(schema),
  });

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = methods;

  // console.log(errors)

  const componentElement = steps.map((Component, index) => (
    <Component
      key={index}
      onRequired={handleAreRequiredFieldsFilled}
      control={control}
      methods={methods}
      errors={errors}
      on
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

  // console.log(methods.formState.errors);
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
