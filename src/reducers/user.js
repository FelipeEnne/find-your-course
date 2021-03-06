const localGet = localStorage.getItem('localUser');
const localUser = JSON.parse(localGet);

let initialState = {};

if (localUser === null || !localUser.remember) {
  initialState = {
    user: {
      logged: false,
      id: 0,
      name: '',
      email: '',
      favorite: '',
    },
  };
} else if (localUser.remember) {
  initialState = {
    user: {
      logged: true,
      id: localUser.id,
      name: localUser.name,
      favorite: localUser.favorite,
      email: localUser.email,
    },
  };
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGIN':
      return ({
        logged: true,
        id: action.user.id,
        name: action.user.name,
        email: action.user.email,
        favorite: action.user.favorite,
      });
    case 'LOGOUT':
      return ({
        logged: false,
        id: 0,
        name: '',
        email: '',
      });
    case 'UPDATE_USER':
      return ({
        logged: true,
        id: action.user.id,
        name: action.user.userName,
        email: action.user.userEmail,
        favorite: action.user.userFavorite,
      });
    default:
      return state;
  }
};

export default userReducer;
