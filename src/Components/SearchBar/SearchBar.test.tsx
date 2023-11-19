import { act, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { describe, expect, test } from 'vitest';

import SearchBar from './SearchBar';
import renderWithProviders from '../../__test__/test-utils';

describe('Tests for the SearchBar component', () => {
  test('test saves the entered value to the local storage', async () => {
    userEvent.setup();
    const storageName = 'testingNameForSearchInLocalStorage';
    renderWithProviders(<SearchBar storageName={storageName} />);
    const input = screen.getByRole<HTMLInputElement>('searchbox');
    const button = screen.getByRole('button');
    const value = new Date().toString();
    await act(async () => {
      await userEvent.type(input, value);
      await userEvent.click(button);
    });
    const ls = localStorage.getItem(storageName);
    expect(ls).toBe(value);
  });

  test('test component retrieves the value from the local storage', async () => {
    const storageName = 'testingNameForSearchInLocalStorage';
    const ls = localStorage.getItem(storageName);
    renderWithProviders(<SearchBar storageName={storageName} />);
    const input = screen.getByRole<HTMLInputElement>('searchbox');
    const { value } = input;
    expect(ls).toBe(value);
  });
});
