// userReducer.js
import {CREATE_BOOK_APPOINMENT, CREATE_CONTACT_US, CREATE_PRODUCT_INQUIRY, SIGN_IN_USER} from '../type/constant';
const initialState={
  blogList:[],
  userSign:[],
  contactUs:[]
}


const contactUsReducer = (state = initialState, action) => {
    switch (action.type) {
      case CREATE_CONTACT_US:
        return {
          ...state,
          contactUs:action.payload
        };
      case CREATE_PRODUCT_INQUIRY:
        return {
          ...state,
          data:action.payload
        };
      case SIGN_IN_USER:
        return {
          ...state,
          userSign:action.payload
        };
        case CREATE_BOOK_APPOINMENT:
        return {
          ...state,
          data:action.payload
        };
      default:
        return state;
    }
  };
  
export default contactUsReducer;