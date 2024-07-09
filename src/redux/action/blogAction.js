import { networkApi } from "../../service/api";
import { url, urlEndPoints } from "../../service/apiUrlConfig";
import { CREATE_BLOG_COMMENT, GET_BLOGS, GET_POST_BY_CATEGORY, GET_POST_BY_COMMENTS, GET_POST_CATEGORIES, GET_SINGLE_BLOG } from "../type/constant";


//Blog Api
export const fetchBlogs = ({ page=1, posts_per_page = 10 }) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.allBlogs}?page=${page}&posts_per_page=${posts_per_page}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_BLOGS, payload: response.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const fetchSingleBlog = (id) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.blog}/${id}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_SINGLE_BLOG, payload: response.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const fetchPostCategories = () => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.postCategories}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_POST_CATEGORIES, payload: response.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const addCommentBlog = (params) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.comment}/`;
            const response = await networkApi(apiUrls, 'POST', params);
            dispatch({ type: CREATE_BLOG_COMMENT, payload: response.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
}

export const fetchPostsByCategory = (id) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.postsByCategory}/?category_id=${id}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_POST_BY_CATEGORY, payload: response.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const fetchCommentsByBlog = (id) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.post_by_comments}/${id}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_POST_BY_COMMENTS, payload: response.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};