import { act, render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import Paginator from './Paginator';
import { setupStore } from '../../store/store';
import setSearchParams from '../../__test__/mockUtils';
import { NextRouter } from 'next/router';

vi.mock("next/router", () => ({
  useRouter() {
      return {
          route: "/",
          pathname: "",
          query: "",
          asPath: "",
          push: (query:NextRouter) => setSearchParams({'curPage': query.query.page}),
      };
  },
}));

const store = setupStore();

describe('Tests for the Paginator component', () => {
  const startPage = 3;
  const maxPages = 5;
  beforeEach(() => {
    render(<Paginator curPage={startPage} maxVal={maxPages} />);
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
