import { render, screen } from '@testing-library/react';
import { describe, expect, test, vi } from 'vitest';

import CardsContainer from './CardsContainer';
import { data } from '../../__test__/mockData';


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

describe('Tests for the CardsContainer component', () => {
  test('test number of cards', () => {
    render(<CardsContainer data={data.items} />);
    const cardsArr = screen.queryAllByRole('presentation');
    expect(cardsArr).toHaveLength(data.items!.length! + 1);
  });

  test('test no cards message', () => {
    render(<CardsContainer data={null} />);
    expect(screen.getByText(/Oops! Nothing was found./i)).toBeInTheDocument();
  });
});
