import Card from '../Card/Card';
import './CardsContainer.css';
import * as Type from '../../model/types';

type TCardsContainer = { items: Type.TProduct[] };

function CardsContainer(props: TCardsContainer) {
  const { items } = props;
  return (
    <div className="cardsContainer">
      {items.length ? (
        items.map((item) => <Card {...item} key={item.id} />)
      ) : (
        <div className="cardsContainer__nofound">Oops! Nothing was found.</div>
      )}
    </div>
  );
}

export default CardsContainer;
