/* eslint-disable import/no-extraneous-dependencies */
import { BrowserRouter } from 'react-router-dom';
import { act, render } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { beforeEach, describe, test, vi } from 'vitest';

import App from '../App';
import { apiData as data } from '../__test__/mockData';

vi.mock('../model/apiRoot.ts', async () => {
  const actual = await vi.importActual('../model/apiRoot.ts');
  return {
    ...(actual as object),
    getProducts: vi.fn(() => data),
  };
});

describe('Tests for the SearchLayout component', () => {
  beforeEach(async () => {
    await act(async () => {
      render(
        <BrowserRouter>
          <App />
        </BrowserRouter>
      );
    });
  });

  test('test loading', async () => {
    userEvent.setup();
    // await waitFor(async () => screen.debug());
    // expect(ls).toBe(value);
  });
});
