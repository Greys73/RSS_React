import * as yup from 'yup';

const REQUIRED_MSG = 'This field is required!';

const schema = yup.object().shape({
  name: yup
    .string()
    .required(REQUIRED_MSG)
    .matches(/^[A-ZА-ЯЁ]/, 'First letter should be uppercased'),

  age: yup.number().required(REQUIRED_MSG).min(0, 'Shoul be positive number'),

  email: yup
    .string()
    .required(REQUIRED_MSG)
    .matches(/^[^@]+@[^@]+\.[^@]{2,4}$/, 'Type valid e-mail'),

  password: yup
    .string()
    .required(REQUIRED_MSG)
    .matches(/[0-9]/, 'Should contains number')
    .matches(/[A-ZА-ЯЁ]/, 'Should contains Uppercase letter')
    .matches(/[a-zа-яё]/, 'Should contains lowercase letter')
    .matches(/[^A-ZА-ЯЁa-zа-яё0-9\s]/, 'Should contains special character'),
  confirmPass: yup
    .string()
    .required(REQUIRED_MSG)
    .matches(/[0-9]/, 'Should contains number')
    .matches(/[A-ZА-ЯЁ]/, 'Should contains Uppercase letter')
    .matches(/[a-zа-яё]/, 'Should contains lowercase letter')
    .matches(/[^A-ZА-ЯЁa-zа-яё0-9\s]/, 'Should contains special character'),

  gender: yup.string().required(REQUIRED_MSG),

  accept: yup.boolean().required(REQUIRED_MSG),

  picture: yup.string().required(REQUIRED_MSG),

  country: yup.string().required(REQUIRED_MSG),
});

export default schema;
