/* eslint-disable react/jsx-no-constructed-context-values */
import { BrowserRouter } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, test } from 'vitest';

import Paginator from './Paginator';
import setSearchParams from '../../__test__/mockUtils';
import SearchContext from '../../model/Context';
import { emptyData as data } from '../../__test__/mockData';

describe('Tests for the Paginator component', () => {
  const startPage = 3;
  const maxPages = 5;
  beforeEach(() => {
    render(
      <BrowserRouter>
        <SearchContext.Provider
          value={{ data, setContextData: setSearchParams }}
        >
          <Paginator curPage={startPage} maxVal={maxPages} />
        </SearchContext.Provider>
      </BrowserRouter>
    );
    userEvent.setup();
  });

  test('test updates URL query parameter from button prev', async () => {
    const [, prev, ,] = screen.getAllByRole('button');
    await act(async () => userEvent.click(prev));
    await expect(window.location.search).toBe(`?page=${startPage - 1}`);
  });

  test('test updates URL query parameter from button next', async () => {
    const [, , next] = screen.getAllByRole('button');
    await act(async () => {
      await userEvent.click(next);
      await userEvent.click(next);
    });
    await expect(window.location.search).toBe(`?page=${startPage + 1}`);
  });

  test('test updates URL query parameter from button last', async () => {
    const [, , , last] = screen.getAllByRole('button');
    await act(async () => userEvent.click(last));
    await expect(window.location.search).toBe(`?page=${maxPages}`);
  });

  test('test updates URL query parameter from button first', async () => {
    const [first] = screen.getAllByRole('button');
    await act(async () => userEvent.click(first));
    await expect(window.location.search).toBe('?page=1');
  });
});
