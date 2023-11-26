import { describe, expect, test } from 'vitest';
import setSearchParams from '../__test__/mockUtils';
import { deleteFromQuery } from './deleteFromQuery';

setSearchParams({ curPage: 1 });
setSearchParams({ product: 6 });

describe('Tests for deleteFromQuery function', () => {
  test('test given URL', () => {
    expect(window.location.search).toBe(`?page=1&product=6`);
  });

  test('test updates URL query after product delete', () => {
    expect(deleteFromQuery('product')).toBe(`page=1`);
  });
});
