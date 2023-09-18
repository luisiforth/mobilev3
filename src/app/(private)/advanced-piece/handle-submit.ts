import { FieldValues, SubmitHandler } from 'react-hook-form';

export const onSubmit: SubmitHandler<FieldValues> = async (data) => {
  console.log(data);
  return console.log('teste');
};
