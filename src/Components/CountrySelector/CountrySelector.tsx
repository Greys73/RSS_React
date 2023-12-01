import { UseFormRegisterReturn } from 'react-hook-form';
import { useAppSelector } from '../../hooks';

type TProps = {
  useForm: UseFormRegisterReturn<string>;
};

function CountrySelector(props: TProps) {
  const countries = useAppSelector((store) => store.countries);
  return (
    <div>
      <input type="text" list="datalist" {...props.useForm} />
      <datalist id="datalist">
        {countries.map((country) => (
          <option key={country} value={country}>
            {country}
          </option>
        ))}
      </datalist>
    </div>
  );
}

export default CountrySelector;
