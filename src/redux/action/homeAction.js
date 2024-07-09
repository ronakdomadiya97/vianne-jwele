import { networkApi } from "../../service/api";
import { url, urlEndPoints } from "../../service/apiUrlConfig";
import { ADD_COMPARE, ADD_WHISHLIST_DATA, GET_CATEGORY, GET_CATEGORY_PRODUCT, GET_POST, GET_PRODUCT, GET_RELATED_PRODUCT, GET_SINGLE_SHOP, GET_SUBCATEGORY, NAV_CLOSE, USER_DETAILS, USER_ORDERS, GET_PRODUCT_FILTER, ADDTOCART, LOADER, INSTAGRAMPOST, CURRENCY_CONVERT, CURRENCY } from "../type/constant";

export const fetchCategory = () => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.category}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_CATEGORY, payload: response.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};
export const fetchProduct = (search) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.allProduct}/search?search=${search}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_PRODUCT, payload: response?.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};
export const fetchProducts = (search) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.allProduct}/?search=${search}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_PRODUCT, payload: response?.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const fetchAllProductUser = (user_id, perPage = 10, page = 1) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.allProduct}/?page=${page}&posts_per_page=${perPage}&user_id=${user_id}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_PRODUCT, payload: response?.data });
            return response
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};
export const fetchBlog = () => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.post}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_POST, payload: response?.data?.posts });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};
export const fetchSingleProduct = (id) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.product}/${id}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_SINGLE_SHOP, payload: response?.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const fetchRelatedProduct = (id) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.relatedProducts}/${id}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_RELATED_PRODUCT, payload: response?.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const fetchRelatedProductUser = (user_id, id) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.relatedProducts}/${id}?user_id=${user_id}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_RELATED_PRODUCT, payload: response?.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};
export const fetchCategoryWiseProduct = (id, perPage = 10, page = 1) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.categoryProdcuts}?page=${page}&posts_per_page=${perPage}&category_id=${id}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_CATEGORY_PRODUCT, payload: response?.data?.variable_products });
            return response;
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};
export const fetchCategoryWiseProductUser = (id, user_id, perPage = 10, page = 1) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.categoryProdcuts}?page=${page}&posts_per_page=${perPage}&category_id=${id}&user_id=${user_id}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_CATEGORY_PRODUCT, payload: response?.data?.variable_products });
            return response;
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const fetchSingleProductVariation = (id) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.singleProductVariation}/${id}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_SINGLE_SHOP, payload: response?.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const fetchSingleProductVariationUser = (user_id, id) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.singleProductVariation}/${id}?user_id=${user_id}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_SINGLE_SHOP, payload: response?.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};
export const getSubCategory = (id) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.subCategory}/${id}/children`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_SUBCATEGORY, payload: response?.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};
export const productFilters = (id) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.productFilters}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_PRODUCT_FILTER, payload: response?.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};
export const getProductWiseFilter = ({ id, page = 1, minPrice, maxPrice, metal, metal_color }) => {
    return async (dispatch) => {
        try {
            let apiUrls = `${url.apiUrl}${urlEndPoints.filteredProducts}?category_id=${id}&page=${page}`;
            if (minPrice && maxPrice) {
                apiUrls = apiUrls + `&min_price=${minPrice}&max_price=${maxPrice}`;
            }
            if (metal) {
                apiUrls = apiUrls + `&carat=${metal}`;
            }
            if (metal_color) {
                apiUrls = apiUrls + `&color=${metal_color}`;
            }
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: GET_CATEGORY_PRODUCT, payload: response?.data?.products });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const addWhishListData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: ADD_WHISHLIST_DATA, payload: data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const navHoverClose = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: NAV_CLOSE, payload: data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const addComapreListData = (data) => {
    return async (dispatch) => {
        try {
            dispatch({ type: ADD_COMPARE, payload: data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const getUserDetail = (id) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.userDetail}/${id}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: USER_DETAILS, payload: response?.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const getUserOrders = (data) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.userOrder}?email=${data}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: USER_ORDERS, payload: response?.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};


//add to cart after login

export const addToCartProduct = (params, userId) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.addToCartItems}?user_id=${userId}`;
            const response = await networkApi(apiUrls, 'POST', params);
            return response;
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
}
export const delete_cart_items = (params, userId) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.delete_cart_items}?user_id=${userId}`;
            const response = await networkApi(apiUrls, 'POST', params);
            return response;
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
}

export const getCartProduct = (userId) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.getCartItems}?user_id=${userId}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: ADDTOCART, payload: response?.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};


export const getInstagranPost = () =>{
    return async (dispatch) => {
        try {
            const apiUrls = 'https://graph.instagram.com/me/media?fields=id,caption,media_url,media_type&access_token=IGQWRNMXNqZAlpsZAFV5aV93X1U3ZAlB2Q1BZARmZAkRnlPa1otWU8xYmkwSUd0eF9RcTNKUk95bmRyRVFUVUhnakpMQks3b0tJTHhpbWNWX1dFUEs4d19rQUcxdVZAKMU5RUUEteWtlNHAzejYzSTA0VTNQekpBV1FtaGsZD';
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: INSTAGRAMPOST, payload: response?.data?.data });
           
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
    
}
const API_KEY = 'c1e2a00bdb0549e9839b5f08e4e1e753';

export const cuurencyConvter = (data) =>{
    return async (dispatch) => {
        try {
            const apiUrls = `https://open.er-api.com/v6/latest/${data?.from}?apikey=${API_KEY}`;
            const response = await networkApi(apiUrls, 'GET');
            dispatch({ type: CURRENCY_CONVERT, payload: response.data.rates[data?.to] });
            dispatch({ type: CURRENCY, payload: data?.to });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
}



export const setLoader = (dialogObj) => async (dispatch) => {
    dispatch({
      type: LOADER,
      payload: dialogObj,
    });
  };
export const registerUser = (params) => {
    return async (dispatch) => {
        try {
            const apiUrls =`${url.apiUrl}${urlEndPoints.register}`;
            const headers = {
                'Content-Type': 'multipart/form-data',
            };
            const response = await networkApi(apiUrls, 'POST', params, headers);
            console.log('response',response)
            return response;
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};
