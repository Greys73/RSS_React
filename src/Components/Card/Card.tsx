import './Card.css';
import * as Type from '../../model/types';

function Card(props: Type.TCharacter) {
  const { name, image, status, gender, species } = props;
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

export default Card;
