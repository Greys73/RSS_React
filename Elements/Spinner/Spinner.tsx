import './Spinner.module.css';
import loadImg from '../../../public/spinner.gif';
import Image from 'next/image';

function Spinner() {
  return (
    <div className="loader">
      <Image
        className="loader__image"
        src={loadImg}
        alt="Loading..."
        width={500}
        height={500}
      />
    </div>
  );
}

export default Spinner;
