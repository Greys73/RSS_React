import { Component, ReactNode } from 'react';
import * as Type from '../../model/types';
import Card from '../Card/Card';
import './CardsContainer.css';

class CardsContainer extends Component<{ items: Type.TCharacter[] }> {
  render(): ReactNode {
    const { items } = this.props;
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
}

export default CardsContainer;
