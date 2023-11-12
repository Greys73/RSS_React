/* eslint-disable react/jsx-no-constructed-context-values */

import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import CardsContainer from './CardsContainer';
import SearchContext from '../../model/Context';
import { data, emptyData } from '../../__test__/mockData';

describe('Tests for the CardsContainer component', () => {
  const setContextData = () => {};

  test('test number of cards', () => {
    render(
      <MemoryRouter>
        <SearchContext.Provider value={{ data, setContextData }}>
          <CardsContainer />
        </SearchContext.Provider>
      </MemoryRouter>
    );
    const cardsArr = screen.queryAllByRole('presentation');
    expect(cardsArr).toHaveLength(data.items!.length! + 1);
  });

  test('test no cards message', () => {
    render(
      <MemoryRouter>
        <SearchContext.Provider value={{ data: emptyData, setContextData }}>
          <CardsContainer />
        </SearchContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByText(/Oops! Nothing was found./i)).toBeInTheDocument();
  });
});
