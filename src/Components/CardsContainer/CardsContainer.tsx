import Card from '../Card/Card';
import './CardsContainer.css';
import * as Type from '../../model/types';

type TCardsContainer = { items: Type.TCharacter[] };

function CardsContainer(props: TCardsContainer) {
  const { items } = props;
  return (
    <div className="cardsContainer">
      {items ? (
        items.map((item) => <Card {...item} key={item.id} />)
      ) : (
        <div className="cardsContainer__nofound">Oops! Hero not found.</div>
      )}
    </div>
  );
}

export default CardsContainer;
