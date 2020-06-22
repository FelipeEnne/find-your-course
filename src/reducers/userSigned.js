const userSigned = (state = [], action) => {
  switch (action.type) {
    case 'CURRENT_USER':
      return ([...state,
        {
          id: action.user.id,
          name: action.user.name,
        },
      ]);
    default:
      return state;
  }
};

export default userSigned;
