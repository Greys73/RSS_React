import * as yup from 'yup';
import { fileExtCheck, fileSizeCheck } from '../utils/fileCheckers';

const REQUIRED_MSG = 'This field is required!';

const schema = yup.object().shape({
  name: yup
    .string()
    .required(REQUIRED_MSG)
    .matches(/^[A-ZА-ЯЁ]/, 'First letter should be uppercased'),

  age: yup
    .number()
    .typeError('Should be a number')
    .required(REQUIRED_MSG)
    .min(0, 'Should be positive number'),

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

  accept: yup.boolean().test('accept', 'Should be accepted', (val) => val),

  picture: yup
    .mixed<FileList>()
    .test(
      'fileSize',
      'File size should be less than 1mb',
      (files) => files && fileSizeCheck({ files, size: 1000000 })
    )
    .test(
      'fileExt',
      'File should be png or jpg/jpeg',
      (files) =>
        files &&
        fileExtCheck({ files, extentions: ['image/png', 'image/jpeg'] })
    ),

  country: yup.string().required(REQUIRED_MSG),
});

export default schema;
