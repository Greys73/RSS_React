import loadImg from '../../../public/spinner.gif';
import './Spinner.css';

function Spinner() {
  return (
    <div className="loader">
      <img className="loader__image" src={loadImg} alt="Loading..." />
    </div>
  );
}

export default Spinner;
