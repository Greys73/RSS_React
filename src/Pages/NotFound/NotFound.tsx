import loadImg from '../../../public/nf404.png';
import './NotFound.css';

function NotFound() {
  return (
    <div className="notFound">
      <img className="notFound__image" src={loadImg} alt="Page not found" />
      <button
        type="button"
        className="notFound__button"
        onClick={() => {
          window.location.pathname = '/';
        }}
      >
        Go Main
      </button>
    </div>
  );
}

export default NotFound;
