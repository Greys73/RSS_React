import { Component } from 'react';
import loadImg from '../../../public/spinner.gif';
import './Spinner.css';

class Spinner extends Component {
  render() {
    return (
      <div className="loader">
        <img className="loader__image" src={loadImg} alt="Loading..." />
      </div>
    );
  }
}

export default Spinner;
