import isEmpty from 'lodash/isEmpty';
import axios from 'axios';
const debug = true;

async function networkApi(
  url,
  method = 'GET',
  body = {},
  headers = {},
  isHtmlResponse = false,

) {
  const headerParam = {
    Accept: 'application/json',
    'Content-Type': 'application/json',
    ...headers,
  };
  return new Promise(async function (resolve, reject) {
    try {
      const resBody = {
        method,
        url,
        headers: headerParam,
      };
      if (method === 'POST') {
        resBody.data = body;
      }
      let response = await axios(resBody);
      if (response.status === 401) {
      } else {
        resolve(response);
        // if (isHtmlResponse) {
        //   const responseJSON = await response.text();
        //   resolve(responseJSON);
        // } else {
        //   const responseJSON = response.data;
        //   if (responseJSON.status) {
        //     resolve(responseJSON);
        //   } else {
        //     if (responseJSON && responseJSON.message) {
        //       reject(responseJSON.message);
        //     } else if (responseJSON) {
        //       reject(responseJSON);
        //     }
        //   }
        // }
      }
    } catch (error) {
      reject(error);
    }
  });
}

export { networkApi };

