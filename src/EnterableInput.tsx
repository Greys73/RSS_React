import { Component, ReactNode } from 'react';
import * as Type from './types';
import './assets/styles/EnterableInput.css';

class EnterableInput extends Component<
  Type.EnterableInputProps,
  Type.SearchState
> {
  constructor(props: Type.EnterableInputProps) {
    super(props);
    this.state = {
      value: '',
    };

    this.enterKeyPress = this.enterKeyPress.bind(this);
    this.buttonClick = this.buttonClick.bind(this);
    this.inputChahge = this.inputChahge.bind(this);
  }

  componentDidMount() {
    const { onConfirm, storageName } = this.props;
    if (storageName) {
      const searchString = localStorage.getItem(storageName) || '';
      this.setState({
        value: searchString,
      });
      onConfirm(searchString.trim());
    }
  }

  enterKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') this.buttonClick();
  }

  inputChahge(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  buttonClick() {
    const { onConfirm, storageName } = this.props;
    const { value } = this.state;
    if (storageName) localStorage.setItem(storageName, value);
    onConfirm(value.trim());
  }

  render(): ReactNode {
    return (
      <div className="enterableInput">
        <input
          onChange={this.inputChahge}
          onKeyUp={this.enterKeyPress}
          className="enterableInput__input"
          placeholder={this.props.placeholder}
          value={this.state.value}
        />
        <button
          type="button"
          onClick={this.buttonClick}
          className="enterableInput__button"
        >
          {this.props.btnName || 'SEARCH'}
        </button>
      </div>
    );
  }
}

export default EnterableInput;
