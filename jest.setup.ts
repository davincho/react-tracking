import {
  toBeInTheDocument,
  toHaveClass
} from '@testing-library/jest-dom/matchers';

expect.extend({ toBeInTheDocument, toHaveClass });
