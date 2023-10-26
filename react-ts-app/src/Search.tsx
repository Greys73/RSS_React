import { Component, ReactNode } from 'react';
import * as Type from './types';
import Card from './Card';

const API_URL = 'https://rickandmortyapi.com/api/character';

export default class Search extends Component<
  Type.SearchProps,
  Type.SearchState
> {
  constructor(props: Type.SearchProps) {
    super(props);
    this.state = {
      list: [],
      isLoaded: false,
      error: null,
    };
  }

  componentDidMount(): void {
    fetch(API_URL)
      .then((res) => res.json())
      .then((result) => {
        this.setState({
          list: result.results,
          isLoaded: true,
        });
      })
      .catch((error) => {
        this.setState({ isLoaded: true, error });
      });
  }

  render(): ReactNode {
    const { list, isLoaded, error } = this.state;
    if (error) {
      return <p>RESPONSE ERROR</p>;
    }
    if (!isLoaded) {
      return <p>LOADING...</p>;
    }
    return (
      <div className="cardsContainer">
        {(list as Type.TCharacter[]).map((item) => (
          <Card {...item} key={item.id} />
        ))}
      </div>
    );
  }
}
