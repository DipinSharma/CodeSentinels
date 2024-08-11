import { Socket } from "socket.io-client";

export const initialState = {
    userInfo: undefined,
    userType:undefined,
    videoCall:false,
    booking:undefined,
    socket:undefined
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
        case "set_video_call":
          return{
            ...state,
            videoCall:action.videoCall
          }
        case "set_booking":
          return {
            ...state,
            booking:action.booking
          }
          case "set_socket":
            return {
              ...state,
              socket:action.socket
            }
      default:
        return state;
    }
  };
  