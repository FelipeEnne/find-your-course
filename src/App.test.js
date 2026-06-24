import {
  describe, it, expect, beforeEach,
} from 'vitest';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './components/App';
import store from './reducers/index';

describe('App', () => {
  beforeEach(() => {
    localStorage.setItem('localUser', JSON.stringify({
      id: 0,
      name: '',
      email: '',
      favorite: '',
      remember: false,
    }));
  });

  it('renders without crashing', () => {
    const { container } = render(
      <Provider store={store}>
        <App />
      </Provider>,
    );
    expect(container.querySelector('.App')).toBeTruthy();
  });
});
