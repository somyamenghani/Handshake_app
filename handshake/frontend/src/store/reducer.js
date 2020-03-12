const initialState = {
  userId: 0,
  userName: '',
  userEmail: '',
  userType: 1,
};

const reducer = (state = initialState, action) => {
  if (action.type === 'LOADUSER') {
    return {
      userId: localStorage.getItem('user_id'),
      userName: localStorage.getItem('user_name'),
      userEmail: localStorage.getItem('email_id'),
      userType: localStorage.getItem('user_type'),
    };
  }
  if (action.type === 'UNLOADUSER') {
    return state;
  }
  if (action.type === 'USERDETAILS') {
    return {
      userId: localStorage.getItem('user_id'),
      userName: localStorage.getItem('user_name'),
      userEmail: localStorage.getItem('email_id'),
      userType: localStorage.getItem('user_type'),
      user: localStorage.getItem('user_profile'),
    };
  }
  if (action.type === 'COMPANYDETAILS') {
    return {
      userId: localStorage.getItem('user_id'),
      userName: localStorage.getItem('user_name'),
      userEmail: localStorage.getItem('email_id'),
      userType: localStorage.getItem('user_type'),
      user: localStorage.getItem('user_profile'),
    };
  }
  if (action.type === 'SIGNUP') {
    return {
      signupFlag: 'success',
    };
  }

  return state;
};

export default reducer;
