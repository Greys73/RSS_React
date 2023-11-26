import { act, render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import userEvent from '@testing-library/user-event';
import SearchLayout from '../../Layouts/SearchLayout';
import ProductCard from './ProductCard';
import { data as mockData } from '../../__test__/mockData';

vi.mock("next/router", () => ({
  useRouter() {
      return {
          route: "/",
          pathname: "",
          query: "",
          asPath: "",
          push: vi.fn(),
      };
  },
}));

describe('Tests for the ProductCard component', () => {
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
    const data = mockData.items![1];
    render(<ProductCard data={data} />);
    const btn = screen.getByRole('button');
    await act(async () => {
      await userEvent.click(btn);
    });
    await expect(window.location.search).not.toBe('?product');
  });
});
