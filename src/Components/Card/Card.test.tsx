/* eslint-disable react/jsx-no-constructed-context-values */

// TODO:
// test card opens a detailed card component
// test clicking triggers an additional API call

import { MemoryRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import Card from './Card';
import SearchContext from '../../model/Context';
import { data } from '../../__test__/mockData';

describe('Tests for the Card component', () => {
  const setContextData = () => {};
  const item = data.items![1];

  test('test renders the relevant card data', () => {
    render(
      <MemoryRouter>
        <SearchContext.Provider value={{ data, setContextData }}>
          <Card {...item} key={item.id} />
        </SearchContext.Provider>
      </MemoryRouter>
    );
    expect(screen.getByAltText(item.title)).toBeInTheDocument();
    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByText(item.brand)).toBeInTheDocument();
    expect(screen.getByText(item.category)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(item.price, 'i'))).toBeInTheDocument();
  });
});
