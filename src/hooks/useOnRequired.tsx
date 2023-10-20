import { useEffect } from 'react';
import { FieldValues, Path, UseFormReturn } from 'react-hook-form';

type configProps<T extends FieldValues> = {
  methods: UseFormReturn<T>;
  onRequired: (value: unknown) => boolean;
};

export function useOnRequired<T extends FieldValues>(
  fields: (keyof T)[],
  config: configProps<T>
) {
  const fieldsWatch = config.methods.watch(fields as unknown as Path<T>);
  const checkRequiredField = () => {
    return fieldsWatch.every(
      (element: string[] | string | number | undefined) => {
        if (typeof element === 'object') return element != null;
        if (element == undefined) return false;
        if (typeof element === 'string') return !!element.length;
        if (Array.isArray(element)) return !!element.length;
        return element >= 0;
      }
    );
  };

  useEffect(() => {
    config.onRequired(() => !checkRequiredField());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [fieldsWatch]);
}
