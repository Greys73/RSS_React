import { act, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';
import Card from './Card';
import { data } from '../../__test__/mockData';
import userEvent from '@testing-library/user-event';
import { TProduct } from '@/model/types';
import ProductCard from '../ProductCard/ProductCard';

vi.mock('next/router', () => ({
  useRouter() {
    return {
      route: '/',
      pathname: '',
      query: '',
      asPath: '',
      push: vi.fn(),
    };
  },
}));

describe('Tests for the Card component', () => {
  const item = data.items![1];

  test('test renders the relevant card data', () => {
    render(<Card {...item} />);

    expect(screen.getByAltText(item.title)).toBeInTheDocument();
    expect(screen.getByText(item.title)).toBeInTheDocument();
    expect(screen.getByText(item.brand)).toBeInTheDocument();
    expect(screen.getByText(item.category)).toBeInTheDocument();
    expect(screen.getByText(new RegExp(item.price, 'i'))).toBeInTheDocument();
  });

  test('test card opens a detailed card component', async () => {
    userEvent.setup();

    const jsx = (cardData: TProduct) => (
      <>
        <Card {...item} key={item.id} />
        <ProductCard data={cardData || null} />
      </>
    );
    const { rerender } = render(jsx(data.items[-1]));
    let detailCard = screen.queryAllByRole('button').length;
    await expect(detailCard).toBe(0);
    await act(async () => {
      await userEvent.click(screen.getByRole('presentation'));
    });
    await rerender(jsx(data.items[1]));
    detailCard = screen.queryAllByRole('button').length;
    await expect(detailCard).toBe(1);
  });
});
