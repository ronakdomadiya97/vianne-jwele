// userReducer.js
import {CREATE_BLOG_COMMENT, GET_BLOGS, GET_POST_BY_CATEGORY, GET_POST_BY_COMMENTS, GET_POST_CATEGORIES, GET_SINGLE_BLOG} from '../type/constant';
const initialState={
  blogList:[],
  postCategories:[],
  postByCategory:[],
  postComments:[]
}


const blogReducer = (state = initialState, action) => {
    switch (action.type) {
      case GET_BLOGS:
        return {
          ...state,
          blogList:action.payload
        };
      case GET_SINGLE_BLOG:
        return {
          ...state,
          blog: action.payload
        }
      case GET_POST_CATEGORIES: 
        return {
          ...state,
          postCategories: action.payload
        }
      case CREATE_BLOG_COMMENT: 
        return {
          ...state,
          commentBlog: action.payload
        }
      case GET_POST_BY_CATEGORY: 
        return {
          ...state,
          postByCategory: action.payload
        }
      case GET_POST_BY_COMMENTS: 
        return {
          ...state,
          postComments: action.payload
        }
      default:
        return state;
    }
  };
  
export default blogReducer;