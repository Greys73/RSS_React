import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useNavigate } from 'react-router-dom';
import { initialState, setFormData } from '../../store/features/formDataSlice';
import schema from '../../assets/schema';
import CountrySelector from '../../Components/CountrySelector/CountrySelector';
import imageToBase64 from '../../utils/imageToBase64';
import { useAppDispatch } from '../../hooks';
import InputBlock from '../../Components/InputBlock/InputBlock';

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
          <InputBlock
            useForm={register('name')}
            label="Name"
            type="text"
            error={errors.name?.message}
          />
          <InputBlock
            useForm={register('age')}
            label="Age"
            type="text"
            error={errors.age?.message}
          />
          <InputBlock
            useForm={register('email')}
            label="E-mail"
            type="text"
            error={errors.email?.message}
          />
          <InputBlock
            useForm={register('password')}
            label="Password"
            type="text"
            error={errors.password?.message}
          />
          <InputBlock
            useForm={register('confirmPass')}
            label="Confirm password"
            type="text"
            error={errors.confirmPass?.message}
          />

          <div className="form__element">
            <p className="form__element-label">Gender:</p>
            <select className="form__element-input" {...register('gender')}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <p className="form__element-error">{errors.gender?.message}</p>
          </div>

          <CountrySelector
            useForm={register('country')}
            label="Country"
            error={errors.country?.message}
          />
          <InputBlock
            useForm={register('picture')}
            label="Picture"
            type="file"
            error={errors.picture?.message}
          />
          <InputBlock
            useForm={register('accept')}
            label="Accept"
            type="checkbox"
            error={errors.accept?.message}
          />
          <input type="submit" disabled={!isValid} />
        </form>
      </div>
    </>
  );
}
export default UseStatePage;
