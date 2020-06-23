import { combineReducers, applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';
import user from './user';
import userSigned from './userSigned';
import coursesReducer from './courses';

const rootReducer = combineReducers({
  user,
  userSigned,
  courses: coursesReducer,
});

const middlewares = [thunk];

const store = createStore(rootReducer, applyMiddleware(...middlewares));

export default store;
