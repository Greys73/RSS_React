import { Component, ReactNode } from 'react';
import * as Type from './types';
import './assets/styles/card.css';

export default class Card extends Component<Type.TCharacter> {
  render(): ReactNode {
    const { name, image, status, gender, species } = this.props;
    return (
      <div className="card">
        <div className="card__header">
          <p>{name}</p>
        </div>
        <div className="card__data">
          <div className="card__data__image">
            <img src={image} alt={name} />
          </div>
          <div className="card__data__desc">
            <ul>
              <li>
                <strong>Status:</strong> {status}
              </li>
              <li>
                <strong>Gender:</strong> {gender}
              </li>
              <li>
                <strong>Species:</strong> {species}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
