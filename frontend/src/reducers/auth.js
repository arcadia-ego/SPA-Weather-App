

const INITIAL_STATE = {
    authenticated: "",
    errorMessage: "",
    signingIn: false,
    signingUp: false,
    initTest: "hello!"
  };
  
  export default function(state = INITIAL_STATE, action) {
    return { ...state };
    // switch (action.type) {
    //   case SIGNING_IN:
    //   return { ...state, signingIn: true };
    //   case SIGNING_UP:
    //   return { ...state, signingUp: true };
    //   case AUTH_USER:
    //   return { ...state, authenticated: action.payload };
    //   case ERROR:
    //   //   console.log("ACTION IN ERROR", action);
    //   console.log("ERROR MESSAGE IN REDUCERS", state);
    //   return { ...state, errorMessage: action.errorMessage };
    //   default:
    //     return state;
    // }
    // console.log("hello");
  }