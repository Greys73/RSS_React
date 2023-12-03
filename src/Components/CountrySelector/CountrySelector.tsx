/* eslint-disable react/require-default-props */
import { RefObject } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import { useAppSelector } from '../../hooks';

type TProps = {
  useForm?: UseFormRegisterReturn<string>;
  useRef?: RefObject<HTMLInputElement>;
  label: string;
  error: string | undefined;
};

function CountrySelector({ useForm, useRef, label, error }: TProps) {
  const countries = useAppSelector((store) => store.countries);
  return (
    <div className="form__element">
      <p className="form__element-label">{label}:</p>
      {useRef ? (
        <input type="text" list="datalist" ref={useRef} autoComplete="on" />
      ) : (
        <input type="text" list="datalist" {...useForm} autoComplete="on" />
      )}

      <datalist id="datalist">
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </datalist>
      <p className="form__element-error">{error}</p>
    </div>
  );
}

export default CountrySelector;
