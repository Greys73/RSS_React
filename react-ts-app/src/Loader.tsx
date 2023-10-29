import { Component } from 'react';
import loadImg from '../public/loader.gif';
import './assets/styles/loader.css';

class Loader extends Component {
  render() {
    return (
      <div className="loader">
        <img className="loader__image" src={loadImg} alt="Loading..." />
      </div>
    );
  }
}

export default Loader;
