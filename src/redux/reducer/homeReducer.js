// userReducer.js
import { ADD_WHISHLIST_DATA, GET_CATEGORY, GET_CATEGORY_PRODUCT, GET_POST, GET_PRODUCT, GET_RELATED_PRODUCT, GET_SINGLE_SHOP, GET_SUBCATEGORY, NAV_CLOSE, ADD_COMPARE, USER_DETAILS, USER_ORDERS,GET_PRODUCT_FILTER, ADDTOCART, LOADER, INSTAGRAMPOST, CURRENCY_CONVERT, CURRENCY } from '../type/constant';
const initialState = {
  categoryList: [],
  productList: [],
  postList: [],
  productDetail: {},
  relatedProductList: [],
  isNavClose: false,
  subCategoryList: [],
  compareList: [],
  productFilter:{},
  cartList:[],
  loader: false,
  instagramList:[],
  currencyRate:0,
  currency:'INR',
}


const homeReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_CATEGORY:
      return {
        ...state,
        categoryList: action.payload
      };
    case GET_PRODUCT:
      return {
        ...state,
        productList: action.payload
      };
    case GET_POST:
      return {
        ...state,
        postList: action.payload
      };
    case GET_SINGLE_SHOP:
      return {
        ...state,
        productDetail: action.payload
      };
    case GET_RELATED_PRODUCT:
      return {
        ...state,
        relatedProductList: action.payload
      };
    case GET_CATEGORY_PRODUCT:
      return {
        ...state,
        categoryProductList: action.payload
      };
    case ADD_WHISHLIST_DATA:
      return {
        ...state,
        whishList: action.payload
      };
    case NAV_CLOSE:
      return {
        ...state,
        isNavClose: action.payload
      };
    case GET_SUBCATEGORY:
      return {
        ...state,
        subCategoryList: action.payload
      };
    case ADD_COMPARE:
      return {
        ...state,
        compareList: action.payload
      }
    case GET_PRODUCT_FILTER:
      return {
        ...state,
        productFilter: action.payload
      }
    case USER_DETAILS:
      return {
        ...state,
        userDetails: action.payload
      }
    case USER_ORDERS:
      return {
        ...state,
        userOrders: action.payload
      }
    case ADDTOCART:
      return {
        ...state,
        cartList: action.payload
      }
    case LOADER:
      return {
        ...state,
        loader: action.payload
      }
      case INSTAGRAMPOST:
        return {
          ...state,
          instagramList: action.payload
        }
      case CURRENCY_CONVERT:
        return {
          ...state,
          currencyRate: action.payload
        }
      case CURRENCY:
        return {
          ...state,
          currency: action.payload
        }

    default:
      return state;
  }
};

export default homeReducer;