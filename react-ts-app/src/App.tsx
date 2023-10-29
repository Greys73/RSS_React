import { Component, ReactNode } from 'react';
import EnterableInput from './EnterableInput';
import getCharacters from './apiRoot';
import CardsContainer from './CardsContainer';
import * as Type from './types';
import Loader from './Loader';

class App extends Component<
  unknown,
  {
    items: Type.TCharacter[];
    error: boolean;
    isLoading: boolean;
  }
> {
  constructor(props: unknown) {
    super(props);
    this.state = {
      items: [],
      error: false,
      isLoading: false,
    };
    this.getSearchString = this.getSearchString.bind(this);
  }

  getSearchString(value: string): void {
    this.setState({ isLoading: true });
    setTimeout(() => {
      getCharacters(value).then((res) => this.setState({ items: res }));
      this.setState({ isLoading: false });
    }, 300);
  }

  render(): ReactNode {
    const { items, error } = this.state;
    if (error) throw new Error();
    return (
      <div className="main">
        <button
          className="simulaeErrorButton"
          type="button"
          onClick={() => {
            this.setState({ error: true });
          }}
        >
          Simulate ERROR
        </button>
        <EnterableInput
          btnName="🔍"
          onConfirm={this.getSearchString}
          placeholder="Character name"
          storageName="SearchCharacterQuery"
        />
        <CardsContainer items={items} />
        {this.state.isLoading ? <Loader /> : ''}
      </div>
    );
  }
}

export default App;
