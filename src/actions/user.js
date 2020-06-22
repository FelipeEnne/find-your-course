const login = user => ({
    type: 'LOGIN',
    user,
  });
  
  const logout = () => ({
    type: 'LOGOUT',
  });
  
  const updateUser = user => ({
    type: 'UPDATE_USER',
    user,
  })

  const currentUser = user => ({
    type: 'CURRENT_USER',
    user,
  });

  export {login, logout, updateUser, currentUser};