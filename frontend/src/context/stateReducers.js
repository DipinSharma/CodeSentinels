export const initialState = {
    userInfo: undefined,
    userType:undefined
  };
  
  export const reducer = (state, action) => {
    switch (action.type) {
      // Define your actions here
      case "set_user_info":
        return {
          ...state,
          userInfo: action.userInfo,
        };
        case "set_user_type":
            return {
                ...state,
                userType:action.userType
            }
      default:
        return state;
    }
  };
  