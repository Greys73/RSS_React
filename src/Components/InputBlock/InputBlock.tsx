/* eslint-disable react/require-default-props */
import { RefObject } from 'react';
import { UseFormRegisterReturn } from 'react-hook-form';

type TProps = {
  useForm?: UseFormRegisterReturn<string>;
  useRef?: RefObject<HTMLInputElement>;
  label: string;
  error: string | undefined;
  type: string;
};

function InputBlock({ useForm, useRef, label, error, type }: TProps) {
  return (
    <div className="form__element">
      <p className="form__element-label">{label}:</p>
      <input
        className={type === 'text' ? 'form__element-input' : ''}
        {...useForm}
        placeholder={label}
        type={type}
        ref={useRef}
        autoComplete={label.toLocaleLowerCase() || 'on'}
      />
      <p className="form__element-error">{error}</p>
    </div>
  );
}

export default InputBlock;
