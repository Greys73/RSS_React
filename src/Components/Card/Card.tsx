// import { useSearchParams } from 'react-router-dom';
import './Card.css';
import * as Type from '../../model/types';
import { useAppDispatch } from '../../hooks';
import { setCurItem } from '../../features/viewModeSlice';
import { getProduct } from '../../model/apiRoot';

function Card(props: Type.TProduct) {
  const { id, title, brand, category, thumbnail, price } = props;
  const dispatch = useAppDispatch();

  function onClick(e: React.MouseEvent<HTMLElement>) {
    e.stopPropagation();
    getProduct(id.toString()).then((res) => {
      if (res.id) dispatch(setCurItem(res || null));
    });
  }

  return (
    <div className="card" role="presentation" onClick={onClick}>
      <div className="card__header">
        <p>{title}</p>
      </div>
      <div className="card__data">
        <div className="card__data__image">
          <img src={thumbnail} alt={title} />
        </div>
        <div className="card__data__desc">
          <ul>
            <li>
              <span className="title">Brand:</span> {brand}
            </li>
            <li>
              <span className="title">Category:</span> {category}
            </li>
            <li>
              <span className="title">Price:</span> {price} €
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Card;
