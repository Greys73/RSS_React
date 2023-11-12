/* eslint-disable react/jsx-no-constructed-context-values */

// TODO:
// test clicking triggers an additional API call

import { MemoryRouter, Params } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import Card from './Card';
import SearchContext from '../../model/Context';
import { data } from '../../__test__/mockData';
import ProductCard from '../ProductCard/ProductCard';
import setSearchParams from '../../__test__/mockUtils';
import { TProduct } from '../../model/types';

vi.mock('react-router-dom', async () => {
  const mod: Readonly<Params<string>> =
    await vi.importActual('react-router-dom');
  return {
    ...mod,
    useSearchParams: () => [{}, setSearchParams],
  };
});

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

  test('test card opens a detailed card component', async () => {
    userEvent.setup();
    const jsx = (cardData: TProduct) => (
      <MemoryRouter>
        <SearchContext.Provider value={{ data, setContextData }}>
          <Card {...item} key={item.id} />
          <ProductCard data={cardData} onClose={() => {}} />
        </SearchContext.Provider>
      </MemoryRouter>
    );
    const { rerender } = render(jsx(data.curItem!));
    let detailCard = screen.queryAllByRole('button').length;
    await expect(detailCard).toBe(0);
    await act(async () => {
      await userEvent.click(screen.getByRole('presentation'));
    });
    data.curItem = data.items![1]!;
    await rerender(jsx(data.curItem!));
    detailCard = screen.queryAllByRole('button').length;
    await expect(detailCard).toBe(1);
  });
});
