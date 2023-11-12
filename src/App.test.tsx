import { BrowserRouter } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import App from './App';

describe('App', () => {
  test('test Error button on page', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    const btn = screen.getByRole('button', { name: /Simulate ERROR/i });
    expect(btn).toBeInTheDocument();
  });
});
