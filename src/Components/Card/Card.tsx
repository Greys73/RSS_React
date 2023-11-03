import './Card.css';
import * as Type from '../../model/types';

function Card(props: Type.TProduct) {
  const { title, brand, category, thumbnail, price } = props;
  return (
    <div className="card">
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
