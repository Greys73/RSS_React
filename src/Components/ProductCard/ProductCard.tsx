import { MouseEventHandler } from 'react';
import { TProduct } from '../../model/types';
import './ProductCard.css';
import '../../Elements/buttons/Close/roundBtn.css';

type TProductCardProps = {
  data: TProduct;
  onClose: MouseEventHandler;
};

function ProductCard({ data, onClose }: TProductCardProps) {
  return data ? (
    <div className="product">
      <button
        type="button"
        className="roundBtn product__close"
        onClick={onClose}
      >
        X
      </button>
      <div className="product__header">
        <p>{data.title}</p>
      </div>
      <div className="product__data">
        <div className="product__data__image">
          <img src={data.thumbnail} alt={data.title} />
        </div>
        <div className="product__data__desc">
          <ul>
            <li>
              <span className="title">Brand:</span> {data.brand}
            </li>
            <li>
              <span className="title">Category:</span> {data.category}
            </li>
            <li>
              <span className="title">Price:</span> {data.price} €
            </li>
          </ul>
        </div>
      </div>
      <div className="product__description">
        <p>{data.description}</p>
      </div>
    </div>
  ) : (
    ''
  );
}

export default ProductCard;
