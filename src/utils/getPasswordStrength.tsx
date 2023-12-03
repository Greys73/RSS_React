import schema from '../assets/schema';

export default async function getPasswordStrength(password: string) {
  let result = 0;
  await schema
    .validateAt('password', { password }, { abortEarly: false })
    .catch((e) => {
      result = e.inner.length;
    });
  return result;
}
