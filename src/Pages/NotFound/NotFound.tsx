import { Link } from 'react-router-dom';
import loadImg from '../../../public/nf404.png';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notFound">
      <img className="notFound__image" src={loadImg} alt="Page not found" />
      <Link to="/">
        <button type="button" className="notFound__button">
          Go Main
        </button>
      </Link>
    </div>
  );
}

export default NotFound;
