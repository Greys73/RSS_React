import { FormEvent, useRef, useState } from 'react';
import { ValidationError } from 'yup';
import { useNavigate } from 'react-router-dom';
import { setFormData } from '../../store/features/formDataSlice';
import schema from '../../assets/schema';
import CountrySelector from '../../Components/CountrySelector/CountrySelector';
import imageToBase64 from '../../utils/imageToBase64';
import { useAppDispatch } from '../../hooks';
import InputBlock from '../../Components/InputBlock/InputBlock';

function UseRefPage() {
  const dispatch = useAppDispatch();
  const location = useNavigate();

  const nameRef = useRef<HTMLInputElement>(null);
  const ageRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPassRef = useRef<HTMLInputElement>(null);
  const genderRef = useRef<HTMLSelectElement>(null);
  const acceptRef = useRef<HTMLInputElement>(null);
  const pictureRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const errorsTeml: { [key: string]: { message: string } } = {
    name: { message: '' },
    age: { message: '' },
    email: { message: '' },
    password: { message: '' },
    confirmPass: { message: '' },
    gender: { message: '' },
    accept: { message: '' },
    picture: { message: '' },
    country: { message: '' },
  };
  const [errors, setErrors] = useState(errorsTeml);

  const submitData = async (e: FormEvent) => {
    e.preventDefault();
    let isValid = true;
    const data = {
      name: nameRef.current!.value,
      age: ageRef.current!.value,
      email: emailRef.current!.value,
      password: passwordRef.current!.value,
      confirmPass: confirmPassRef.current!.value,
      gender: genderRef.current!.value,
      accept: acceptRef.current!.checked,
      picture: pictureRef.current!.files,
      country: countryRef.current!.value,
    };

    try {
      schema.validateSync({ ...data }, { abortEarly: false });
    } catch (err) {
      if (err instanceof ValidationError) {
        const newErrors = Object.create(errorsTeml);
        err.inner.forEach((error) => {
          if (error.path) {
            newErrors[error.path].message = error.message;
          }
        });
        setErrors(newErrors);
      }
      isValid = false;
    }
    if (isValid) {
      const image = await imageToBase64(data.picture![0]);
      const resultData = { ...data, picture: image };
      await dispatch(setFormData(resultData));
      location('/', { state: { from: 'useref' } });
    }
  };

  return (
    <>
      <h2 className="hook-header">Uncontrolled components form</h2>
      <div className="form-container">
        <form className="form" onSubmit={submitData}>
          <InputBlock
            label="Name"
            type="text"
            error={errors.name?.message}
            useRef={nameRef}
          />
          <InputBlock
            label="Age"
            type="text"
            error={errors.age?.message}
            useRef={ageRef}
          />
          <InputBlock
            label="E-mail"
            type="text"
            error={errors.email?.message}
            useRef={emailRef}
          />
          <InputBlock
            label="Password"
            type="text"
            error={errors.password?.message}
            useRef={passwordRef}
          />
          <InputBlock
            label="Confirm password"
            type="text"
            error={errors.confirmPass?.message}
            useRef={confirmPassRef}
          />

          <div className="form__element">
            <p className="form__element-label">Gender:</p>
            <select className="form__element-input" ref={genderRef}>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            <p className="form__element-error">{errors.gender?.message}</p>
          </div>

          <CountrySelector
            label="Country"
            error={errors.country?.message}
            useRef={countryRef}
          />
          <InputBlock
            label="Picture"
            type="file"
            error={errors.picture?.message}
            useRef={pictureRef}
          />
          <InputBlock
            label="Accept"
            type="checkbox"
            error={errors.accept?.message}
            useRef={acceptRef}
          />
          <input type="submit" />
        </form>
      </div>
    </>
  );
}
export default UseRefPage;
