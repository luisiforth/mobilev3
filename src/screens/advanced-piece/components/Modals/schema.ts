import * as yup from 'yup';

export const schema = yup.object({
  defect: yup.object().shape({
    label: yup.string().required('O campo "label" é obrigatório'),
    value: yup.number().required('O campo "value" é obrigatório'),
  }),
  deformity: yup.object().shape({
    label: yup.string().required('O campo "label" é obrigatório'),
    value: yup.number().required('O campo "value" é obrigatório'),
  }),
  diff: yup.object().shape({
    label: yup.string().required('O campo "label" é obrigatório'),
    value: yup.number().required('O campo "value" é obrigatório'),
  }),
  images: yup.array().required('Imagem é obrigatória'),
  observation: yup.string(),
  shine: yup.object().shape({
    label: yup.string().required('O campo "label" é obrigatório'),
    value: yup.number().required('O campo "value" é obrigatório'),
  }),
  texture: yup.object().shape({
    label: yup.string().required('O campo "label" é obrigatório'),
    value: yup.number().required('O campo "value" é obrigatório'),
  }),
  tom: yup.number().required('Este campo é obrigatório'),
  tonality: yup.object().shape({
    label: yup.string().required('O campo "label" é obrigatório'),
    value: yup.number().required('O campo "value" é obrigatório'),
  }),
});
