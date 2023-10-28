import { Component, ReactNode } from 'react';
import * as Type from './types';

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

  enterKeyPress(event: React.KeyboardEvent) {
    if (event.key === 'Enter') this.buttonClick();
  }

  inputChahge(event: React.ChangeEvent<HTMLInputElement>) {
    this.setState({ value: event.target.value });
  }

  buttonClick() {
    const { onConfirm } = this.props;
    const { value } = this.state;
    onConfirm(value);
  }

  render(): ReactNode {
    return (
      <div className="searchContainer">
        <input onChange={this.inputChahge} onKeyUp={this.enterKeyPress} />
        <button type="button" onClick={this.buttonClick}>
          {this.props.btnName || 'SEARCH'}
        </button>
      </div>
    );
  }
}

export default EnterableInput;
