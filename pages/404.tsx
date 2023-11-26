import loadImg from '@/public/nf404.png';
import Image from 'next/image';

function Page404() {
  return (
    <div className="notFound">
      <Image
        className="notFound__image"
        src={loadImg}
        alt="Page not found"
        width={500}
        height={500}
      />
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

export default Page404;
