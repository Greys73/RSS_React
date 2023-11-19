import { MemoryRouter, Params } from 'react-router-dom';
import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { describe, expect, test, vi } from 'vitest';

import { Provider } from 'react-redux';
import Card from './Card';
import { data } from '../../__test__/mockData';
import ProductCard from '../ProductCard/ProductCard';
import setSearchParams from '../../__test__/mockUtils';
import { TProduct } from '../../model/types';
import renderWithProviders from '../../__test__/test-utils';
import { setupStore } from '../../store/store';

vi.mock('react-router-dom', async () => {
  const mod: Readonly<Params<string>> =
    await vi.importActual('react-router-dom');
  return {
    ...mod,
    useSearchParams: () => [{}, setSearchParams],
  };
});

const store = setupStore();

describe('Tests for the Card component', () => {
  const item = data.items![1];

  test('test renders the relevant card data', () => {
    renderWithProviders(
      <MemoryRouter>
        <Card {...item} key={item.id} />
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
      <Provider store={store}>
        <MemoryRouter>
          <Card {...item} key={item.id} />
          <ProductCard data={cardData || null} onClose={() => {}} />
        </MemoryRouter>
      </Provider>
    );
    const { rerender } = renderWithProviders(
      jsx(data.items[store.getState().curItem.id!])
    );
    let detailCard = screen.queryAllByRole('button').length;
    await expect(detailCard).toBe(0);
    await act(async () => {
      await userEvent.click(screen.getByRole('presentation'));
    });
    await rerender(jsx(data.items[store.getState().curItem.id!]));
    detailCard = screen.queryAllByRole('button').length;
    await expect(detailCard).toBe(1);
  });
});
