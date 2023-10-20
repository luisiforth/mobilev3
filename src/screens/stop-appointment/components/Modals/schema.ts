import * as yup from 'yup';

export const schema = yup.object({
  equipment: yup.object().shape({
    label: yup.string().required('O campo é obrigatório'),
    value: yup.number().required('O campo é obrigatório'),
  }),
  motiveStopped: yup.object().shape({
    label: yup.string().required('O campo é obrigatório'),
    value: yup.number().required('O campo é obrigatório'),
  }),
  product: yup.object().shape({
    label: yup.string().required('O campo é obrigatório'),
    value: yup.number().required('O campo é obrigatório'),
  }),
  typeStopped: yup.object().shape({
    label: yup.string().required('O campo é obrigatório'),
    value: yup.number().required('O campo é obrigatório'),
  }),
  initialDate: yup.date().default(new Date()),
  finalDate: yup.date().default(new Date()),
  initialHour: yup.date().default(new Date()),
  finalHour: yup.date().default(new Date()),
  timeInMinutes: yup.string(),
  observation: yup.string(),
});
