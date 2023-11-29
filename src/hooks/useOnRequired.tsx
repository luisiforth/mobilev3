import { useEffect } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type configProps<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  onRequired: (value: unknown) => boolean;
  isAllZero?: boolean;
};

export function useOnRequired<T extends FieldValues>(
  fields: (keyof T)[],
  config: configProps<T>
) {
  const fieldsWatch = config.methods.watch(fields as unknown as Path<T>);
  const checkRequiredField = () => {
    return fieldsWatch.every(
      (element: string[] | string | number | undefined | any) => {
        if (element == undefined) return false;
        if (element == null) return false;
        if (Object.values(element).every((v) => v == '')) return false;
        if (
          config.isAllZero &&
          ((element.c == 0 && element.q == 0) ||
            (element.c == undefined && element.q == undefined))
        ) {
          return false;
        }

        if (Array.isArray(element)) return !!element.length;
        if (typeof element === 'object') return element != null;
        if (typeof element === 'string') return !!element.length;
        return element >= 0;
      }
    );
  };

  useEffect(() => {
    config.onRequired(() => !checkRequiredField());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldsWatch]);
}
