import { BrowserRouter } from 'react-router-dom';
import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, test } from 'vitest';

import { Provider } from 'react-redux';
import Paginator from './Paginator';
import { setupStore } from '../../store/store';
import setSearchParams from '../../__test__/mockUtils';

const store = setupStore();

describe('Tests for the Paginator component', () => {
  const startPage = 3;
  const maxPages = 5;
  beforeEach(() => {
    render(
      <Provider store={store}>
        <BrowserRouter>
          <Paginator curPage={startPage} maxVal={maxPages} />
        </BrowserRouter>
      </Provider>
    );
    userEvent.setup();
  });

  test('test updates URL query parameter from button prev', async () => {
    const [, prev, ,] = screen.getAllByRole('button');
    await act(async () => userEvent.click(prev));
    setSearchParams({ curPage: store.getState().viewMode.curPage });
    await expect(window.location.search).toBe(`?page=${startPage - 1}`);
  });

  test('test updates URL query parameter from button next', async () => {
    const [, , next] = screen.getAllByRole('button');
    await act(async () => {
      await userEvent.click(next);
      await userEvent.click(next);
    });
    setSearchParams({ curPage: store.getState().viewMode.curPage });
    await expect(window.location.search).toBe(`?page=${startPage + 1}`);
  });

  test('test updates URL query parameter from button last', async () => {
    const [, , , last] = screen.getAllByRole('button');
    await act(async () => userEvent.click(last));
    setSearchParams({ curPage: store.getState().viewMode.curPage });
    await expect(window.location.search).toBe(`?page=${maxPages}`);
  });

  test('test updates URL query parameter from button first', async () => {
    const [first] = screen.getAllByRole('button');
    await act(async () => userEvent.click(first));
    setSearchParams({ curPage: store.getState().viewMode.curPage });
    await expect(window.location.search).toBe('?page=1');
  });
});
