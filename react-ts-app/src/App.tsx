import { Component, ReactNode } from 'react';
import EnterableInput from './EnterableInput';
import getData from './apiRoot';
import CardsContainer from './CardsContainer';
import * as Type from './types';

class App extends Component<unknown, { items: Type.TCharacter[] }> {
  constructor(props: unknown) {
    super(props);
    this.state = { items: [] };
    this.getSearchString = this.getSearchString.bind(this);
  }

  getSearchString(value: string): void {
    getData(value).then((res) => this.setState({ items: res }));
  }

  render(): ReactNode {
    const { items } = this.state;
    return (
      <>
        <EnterableInput btnName="SEARCH" onConfirm={this.getSearchString} />
        <CardsContainer items={items} />
      </>
    );
  }
}

export default App;
