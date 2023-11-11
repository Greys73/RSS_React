import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';

import App from './App';

describe('App', () => {
  test('Render App.tsx', () => {
    render(<App />);
    const btn = screen.getByRole('button', { name: /Simulate ERROR/i });
    expect(btn).toBeInTheDocument();
  });
});
