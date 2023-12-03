/* eslint-disable react/require-default-props */
import { RefObject, useState } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';
import PasswordStrength from '../PasswordStrength/PasswordStrength';

type TProps = {
  useForm?: UseFormRegisterReturn<string>;
  useRef?: RefObject<HTMLInputElement>;
  label: string;
  error: string | undefined;
  type: string;
  strength?: boolean;
};

function InputBlock({ useForm, useRef, label, error, type, strength }: TProps) {
  const [value, setValue] = useState('');
  return (
    <div className="form__element">
      <p className="form__element-label">{label}:</p>
      {useRef ? (
        <input
          className={type === 'text' ? 'form__element-input' : ''}
          placeholder={label}
          type={type}
          ref={useRef}
          onChange={(e) => {
            setValue(e.target.value);
          }}
          autoComplete={label.toLocaleLowerCase() || 'on'}
        />
      ) : (
        <input
          className={type === 'text' ? 'form__element-input' : ''}
          {...useForm}
          placeholder={label}
          type={type}
          onChange={(e) => {
            useForm?.onChange(e);
            setValue(e.target.value);
          }}
          autoComplete={label.toLocaleLowerCase() || 'on'}
        />
      )}
      {strength ? <PasswordStrength password={value} /> : null}
      <p className="form__element-error">{error}</p>
    </div>
  );
}

export default InputBlock;
