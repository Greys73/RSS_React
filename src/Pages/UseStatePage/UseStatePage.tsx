import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { initialState, setFormData } from '../../store/features/formDataSlice';
import schema from '../../assets/schema';
import CountrySelector from '../../Components/CountrySelector/CountrySelector';
import imageToBase64 from '../../utils/imageToBase64';
import { useAppDispatch } from '../../hooks';

function UseStatePage() {
  const dispatch = useAppDispatch();
  const location = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm({
    defaultValues: { ...initialState[0], picture: undefined },
    resolver: yupResolver(schema),
    mode: 'onChange',
  });

  const submitData = handleSubmit(async (data) => {
    const image = await imageToBase64(data.picture![0]);
    const resultData = { ...data, picture: image };
    dispatch(setFormData(resultData));
    location('/', { state: { from: 'usestate' } });
  });

  return (
    <>
      <h2 className="hook-header">Controlled components form</h2>
      <div className="form-container">
        <form className="form" onSubmit={submitData}>
          <div className="form__element">
            <p className="form__element-label">Name:</p>
            <input
              className="form__element-input"
              {...register('name')}
              placeholder="Name"
            />
            <p className="form__element-error">{errors.name?.message}</p>
          </div>

          <div className="form__element">
            <p className="form__element-label">Age:</p>
            <input
              className="form__element-input"
              {...register('age')}
              placeholder="Age"
            />
            <p className="form__element-error">{errors.age?.message}</p>
          </div>

          <div className="form__element">
            <p className="form__element-label">E-mail:</p>
            <input
              className="form__element-input"
              {...register('email')}
              placeholder="user@mail.com"
            />
            <p className="form__element-error">{errors.email?.message}</p>
          </div>

          <div className="form__element">
            <p className="form__element-label">Password:</p>
            <input className="form__element-input" {...register('password')} />
            <p className="form__element-error">{errors.password?.message}</p>
          </div>
          <div className="form__element">
            <p className="form__element-label">Confirm password:</p>
            <input
              className="form__element-input"
              {...register('confirmPass')}
            />
            <p className="form__element-error">{errors.confirmPass?.message}</p>
          </div>

          <div className="form__element">
            <p className="form__element-label">Gender:</p>
            <input
              className="form__element-input"
              {...register('gender')}
              placeholder=""
            />
            <p className="form__element-error">{errors.gender?.message}</p>
          </div>

          <div className="form__element">
            <p className="form__element-label">Country:</p>
            <CountrySelector useForm={register('country')} />
            <p className="form__element-error">{errors.country?.message}</p>
          </div>

          <p className="form__element-label">Picture:</p>
          <input
            className="form__element-input"
            {...register('picture')}
            type="file"
          />
          <p className="form__element-error">{errors.picture?.message}</p>

          <p className="form__element-label">Accept:</p>
          <input type="checkbox" {...register('accept')} />
          <p className="form__element-error">{errors.accept?.message}</p>

          <input type="submit" disabled={!isValid} />
        </form>
      </div>
    </>
  );
}
export default UseStatePage;
