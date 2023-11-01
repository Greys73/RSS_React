import { Component, ReactNode } from 'react';
import EnterableInput from './Components/SearchBar/SearchBar';
import getCharacters from './model/apiRoot';
import CardsContainer from './Components/CardsContainer/CardsContainer';
import * as Type from './model/types';
import Spinner from './Elements/Spinner/Spinner';

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
          btnLogo="🔍"
          onConfirm={this.getSearchString}
          placeholder="Character name"
          storageName="SearchCharacterQuery"
        />
        <CardsContainer items={items} />
        {this.state.isLoading ? <Spinner /> : ''}
      </div>
    );
  }
}

export default App;
