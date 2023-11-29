import * as yup from 'yup';

export const schema = yup.object({
  product: yup.object().shape({
    label: yup.string().required('O campo é obrigatório'),
    value: yup.number().required('O campo é obrigatório'),
  }),
  defect: yup.array().of(
    yup.object().shape({
      label: yup.string().required('O campo é obrigatório'),
      value: yup.number().required('O campo é obrigatório'),
    })
  ),
  tonality: yup.string(),
  sample: yup.number(),
  tone: yup.number(),

  values: yup.array().of(
    yup.object().shape({
      id: yup.number(),
      c: yup.number().default(0),
      q: yup.number().default(0),
    })
  ),
});
