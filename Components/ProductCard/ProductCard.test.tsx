import { act, render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import userEvent from '@testing-library/user-event';
import SearchLayout from '../../Layouts/SearchLayout';
import ProductCard from './ProductCard';
import { data as mockData } from '../../__test__/mockData';
import renderWithProviders from '../../__test__/test-utils';

describe('Tests for the ProductCard component', () => {
  test('test loading indicator is displayed', async () => {
    renderWithProviders(
      <SearchLayout
        data={{
          items: null,
          curItem: null,
          pagesCount: 0,
          searchString: '',
          itemsPerPage: 0,
          curPage: 0,
        }}
      />
    );
    expect(screen.getByAltText(/Loading.../i)).toBeInTheDocument();
  });

  test('test correctly displays the detailed card data', async () => {
    const data = mockData.items![1];
    render(<ProductCard data={data} />);
    expect(screen.getByAltText(data.title)).toBeInTheDocument();
    expect(screen.getByText(data.title)).toBeInTheDocument();
    expect(screen.getByText(data.brand)).toBeInTheDocument();
    expect(screen.getByText(data.category)).toBeInTheDocument();
    expect(screen.getByText(data.description)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(data.price, 'i'))).toBeInTheDocument();
  });

  test('test clicking the close button', async () => {
    let cardOpened = true;
    const data = mockData.items![1];
    render(<ProductCard data={data} />);
    const btn = screen.getByRole('button');
    expect(cardOpened).toBe(true);
    await act(async () => {
      await userEvent.click(btn);
    });
    expect(cardOpened).not.toBe(true);
  });
});
