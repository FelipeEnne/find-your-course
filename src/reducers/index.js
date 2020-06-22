import { combineReducers, createStore } from 'redux';
import user from './user';
import userSigned from './userSigned';

let initialState = {
  user: {
    logged: false,
    id: 0,
    name: '',
    email: '',
    favorites: '',
  }
};



const rootReducer = combineReducers({
    user,
    userSigned
});

const store = createStore( rootReducer, initialState );

export default store;