import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import CardsContainer from './CardsContainer';
import { data } from '../../__test__/mockData';
import renderWithProviders from '../../__test__/test-utils';

describe('Tests for the CardsContainer component', () => {
  test('test number of cards', () => {
    renderWithProviders(<CardsContainer data={null} />, {
      preloadedState: {
        itemsPerPage: {
          data: data.items,
        },
      },
    });
    const cardsArr = screen.queryAllByRole('presentation');
    expect(cardsArr).toHaveLength(data.items!.length! + 1);
  });

  test('test no cards message', () => {
    renderWithProviders(<CardsContainer data={null} />);
    expect(screen.getByText(/Oops! Nothing was found./i)).toBeInTheDocument();
  });
});
