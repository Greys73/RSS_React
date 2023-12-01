import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { initialState } from '../../store/features/formDataSlice';
import schema from '../../assets/schema';
import CountrySelector from '../../Components/CountrySelector/CountrySelector';

function UseStatePage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: initialState[0],
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const submitData = (data: unknown) => {
    console.log(data);
  };

  return (
    <div className="form-container">
      <div className="form-header">Controlled components page</div>
      <form className="form" onSubmit={handleSubmit(submitData)}>
        <p className="form__element-label">Name:</p>
        <input {...register('name')} placeholder="Name" />
        <p className="form__element-error">{errors.name?.message}</p>

        <p className="form__element-label">Age:</p>
        <input {...register('age')} placeholder="Age" />
        <p className="form__element-error">{errors.age?.message}</p>

        <p className="form__element-label">E-mail:</p>
        <input {...register('email')} placeholder="user@mail.com" />
        <p className="form__element-error">{errors.email?.message}</p>

        <p className="form__element-label">Password:</p>
        <input {...register('password')} />
        <p className="form__element-error">{errors.password?.message}</p>
        <input {...register('confirmPass')} />
        <p className="form__element-error">{errors.confirmPass?.message}</p>

        <p className="form__element-label">Gender:</p>
        <input {...register('gender')} placeholder="" />
        <p className="form__element-error">{errors.gender?.message}</p>

        <p className="form__element-label">Picture:</p>
        <input {...register('picture')} placeholder="" />
        <p className="form__element-error">{errors.picture?.message}</p>

        <p className="form__element-label">Country:</p>
        <CountrySelector useForm={register('country')} />
        <p className="form__element-error">{errors.country?.message}</p>

        <p className="form__element-label">Accept:</p>
        <input {...register('accept')} placeholder="" />
        <p className="form__element-error">{errors.accept?.message}</p>

        <input type="submit" />
      </form>
    </div>
  );
}
export default UseStatePage;
