import { BrowserRouter } from 'react-router-dom';
import { screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import App from './App';
import renderWithProviders from './__test__/test-utils';

describe('App', () => {
  test('test Error button on page', () => {
    renderWithProviders(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const btn = screen.getByRole('button', { name: /Simulate ERROR/i });
    expect(btn).toBeInTheDocument();
  });
});
