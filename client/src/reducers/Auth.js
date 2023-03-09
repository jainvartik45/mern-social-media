const authReducer = (state = { authData: null }, action) => {
    switch (action.type) {
      case 'AUTH':
        console.log(action?.data)
            // return state;
            localStorage.setItem('profile', JSON.stringify({ ...action?.data }));
    //   case actionType.LOGOUT:
    //     localStorage.clear();
  
        return { ...state, authData: null, loading: false, errors: null };
      case 'LOGOUT':
        localStorage.clear();
        
        return{...state , authData : null};
      default:
        return state;
    }
  };
  
  export default authReducer;