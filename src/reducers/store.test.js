import { describe, it, expect } from 'vitest';
import store from './index';

describe('store', () => {
  it('initializes with expected slices', () => {
    const state = store.getState();
    expect(state).toHaveProperty('user');
    expect(state).toHaveProperty('courses');
    expect(state).toHaveProperty('userSigned');
  });
});
