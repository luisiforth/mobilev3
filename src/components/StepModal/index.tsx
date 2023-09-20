import React, { useCallback, useState } from 'react';
import { FieldValues, SubmitHandler, useForm } from 'react-hook-form';
import {
  TouchableWithoutFeedback,
  Keyboard,
  KeyboardAvoidingView,
} from 'react-native';

import Button from '@/components/Button';
import { ProgressBar } from '@/components/ProgressBar';
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';

import * as S from './styles';

interface StepModalProps {
  schema: Yup.ObjectSchema<FieldValues>;
  onSubmit: SubmitHandler<FieldValues>;
  steps: React.ElementType[];
}

export default function StepModal({ schema, onSubmit, steps }: StepModalProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [areRequiredFieldFilled, setAreRequiredFieldsFilled] = useState(false);

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
          {currentStep > 1 && <Button text="Voltar" onPress={handleBack} />}
          {currentStep != steps.length && (
            <Button text="Próximo" onPress={handleNext} />
          )}
          {currentStep == steps.length && (
            <Button
              disabled={areRequiredFieldFilled}
              text="Enviar"
              onPress={handleSubmit(onSubmit)}
            />
          )}
        </S.Root.Wrapper>
      </KeyboardAvoidingView>
    </TouchableWithoutFeedback>
  );
}
