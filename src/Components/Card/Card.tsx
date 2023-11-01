import { Component, ReactNode } from 'react';
import * as Type from '../../model/types';
import './Card.css';

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
                <span className="title">Status:</span> {status}
              </li>
              <li>
                <span className="title">Gender:</span> {gender}
              </li>
              <li>
                <span className="title">Species:</span> {species}
              </li>
            </ul>
          </div>
        </div>
      </div>
    );
  }
}
