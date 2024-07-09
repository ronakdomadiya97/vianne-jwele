import { networkApi } from "../../service/api";
import { url, urlEndPoints } from "../../service/apiUrlConfig";
import { CREATE_BOOK_APPOINMENT, CREATE_CONTACT_US, CREATE_PRODUCT_INQUIRY, SIGN_IN_USER } from "../type/constant";

export const createContactUs = (params) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.contactForm}`;
            const response = await networkApi(apiUrls, 'POST', params);
            dispatch({ type: CREATE_CONTACT_US, payload: response.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const createBookAppoinment = (params) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.bookingAppointment}`;
            const response = await networkApi(apiUrls, 'POST', params);
            dispatch({ type: CREATE_BOOK_APPOINMENT, payload: response.data });
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const createProductInquiry = (params) => {
    return async (dispatch) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.productInquiry}`;
            const response = await networkApi(apiUrls, 'POST', params);
            dispatch({ type: CREATE_PRODUCT_INQUIRY, payload: response.data });
            return response;
        } catch (error) {
            console.error('Error fetching category:', error);
        }
    };
};

export const signInUser = async (params) => {
        try {
            const apiUrls = `${url.apiUrl}${urlEndPoints.login}`;
            const response = await networkApi(apiUrls, 'POST', params);
            return response?.data
        } catch (error) {
            console.error('Error fetching category:', error);
        }
};