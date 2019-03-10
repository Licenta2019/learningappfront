import { createStore } from 'redux';
import { throttle } from 'lodash';
import { loadState, saveState } from './localStorage';
import reducer from './reducers/rootReducer';

const persistedState = loadState();

const store = createStore(
  reducer,
  persistedState
);

store.subscribe(
  throttle(() => {
    saveState({
      account: store.getState().account
    });
  }, 1000)
);

export default store;
