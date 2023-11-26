import '@testing-library/jest-dom/vitest';
import createFetchMock from 'vitest-fetch-mock';
import { beforeAll, vi } from 'vitest';

beforeAll(() => {
  vi.mock("next/router", () => require("next-router-mock"));
});

const fetchMocker = createFetchMock(vi);
fetchMocker.enableMocks();

