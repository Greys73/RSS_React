/* eslint-disable react-hooks/exhaustive-deps */
import './FormsCollection.css';
import { useEffect, useState } from 'react';
import { useAppSelector } from '../../hooks';

function FormsCollection() {
  const cards = useAppSelector((store) => store.formData);

  const styles = {
    grey: { background: 'lightgrey' },
    green: { background: 'lightgreen' },
  };

  const [mark, setMark] = useState(styles.grey);
  useEffect(() => {
    setMark(styles.green);
    setTimeout(() => {
      setMark(styles.grey);
    }, 700);
  }, []);

  if (cards.length <= 1) return <p>Store is empty!</p>;
  return (
    <div className="cards-container">
      {cards
        .map((card, id) =>
          id === 0 ? null : (
            <div
              className="card"
              key={id}
              style={id === cards.length - 1 ? mark : styles.grey}
            >
              <div className="card__image">
                <img src={card.picture} alt={card.name} />
              </div>
              <ul className="card__list">
                <li className="card__list__item">
                  <span className="card__list__item__title">Name: </span>
                  <span className="card__list__item__value">{card.name}</span>
                </li>
                <li className="card__list__item">
                  <span className="card__list__item__title">Age: </span>
                  <span className="card__list__item__value">{card.age}</span>
                </li>
                <li className="card__list__item">
                  <span className="card__list__item__title">Gender: </span>
                  <span className="card__list__item__value">{card.gender}</span>
                </li>
                <li className="card__list__item">
                  <span className="card__list__item__title">Country: </span>
                  <span className="card__list__item__value">
                    {card.country}
                  </span>
                </li>
                <li className="card__list__item">
                  <span className="card__list__item__title">Email: </span>
                  <span className="card__list__item__value">{card.email}</span>
                </li>
                <li className="card__list__item">
                  <span className="card__list__item__title">Password: </span>
                  <span className="card__list__item__value">
                    {card.password}
                  </span>
                </li>
              </ul>
            </div>
          )
        )
        .reverse()}
    </div>
  );
}

export default FormsCollection;
