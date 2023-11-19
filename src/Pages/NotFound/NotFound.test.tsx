import { render, screen } from '@testing-library/react';
import { describe, expect, test } from 'vitest';
import { BrowserRouter } from 'react-router-dom';
import App from '../../App';

describe('404 Page', () => {
  test('test 404 page an invalid route', () => {
    window.history.pushState({}, '404', '/404');
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    expect(screen.getByAltText(/Page not found/i)).toBeInTheDocument();
  });
});
