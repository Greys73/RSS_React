import { Component, ReactNode } from 'react';
import EnterableInput from './EnterableInput';
import getCharacters from './apiRoot';
import CardsContainer from './CardsContainer';
import * as Type from './types';

class App extends Component<
  unknown,
  { items: Type.TCharacter[]; error: boolean }
> {
  constructor(props: unknown) {
    super(props);
    this.state = { items: [], error: false };
    this.getSearchString = this.getSearchString.bind(this);
  }

  getSearchString(value: string): void {
    getCharacters(value).then((res) => this.setState({ items: res }));
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
      </div>
    );
  }
}

export default App;
