import { ComportModalProps } from '@/components/Modal';
import { format, subDays } from 'date-fns';

interface FunctionProps extends ComportModalProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  current: any;
}

export const handlePresentModalPressShow = (
  bottomSheetModalRefShow: FunctionProps,
  bottomSheetModalRefStep: FunctionProps
) => {
  bottomSheetModalRefStep.current?.handleDismiss();
  return bottomSheetModalRefShow.current?.handlePresentModalPress();
};

export const handlePresentModalPressSteps = (
  bottomSheetModalRefStep: FunctionProps,
  bottomSheetModalRefShow: FunctionProps
) => {
  bottomSheetModalRefShow.current?.handleDismiss();
  return bottomSheetModalRefStep.current?.handlePresentModalPress();
};

export function dateRetroactive() {
  const date = new Date();
  const minusOneDay = subDays(date, 1);
  return format(minusOneDay, 'dd/MM/yyyy');
}
