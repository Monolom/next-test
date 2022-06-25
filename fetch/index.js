import { FETCH_URL } from "../constants/index";
export { FETCH_URL };
export const refreshLogin = (token) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: "POST",
      headers: { "x-refresh-token": token },
    };

    fetch(`${FETCH_URL}/refresh`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        return resolve(data.result.access_token);
      })
      .catch((err) => {
        console.log("б", err);
        reject(false);
      });
  });
};

export const loadCounter = (token) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: "GET",
      headers: { "x-access-token": token },
    };

    fetch(`${FETCH_URL}/content/total`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.result);
      })
      .catch((err) => {
        reject(false);
      });
  });
};

export const loadContent = (token, page, limit) => {
  return new Promise((resolve, reject) => {
    const requestOptions = {
      method: "GET",
      headers: { "x-access-token": token },
    };

    fetch(`${FETCH_URL}/content?page=${page}&limit=${limit}`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        resolve(data.result);
      })
      .catch((err) => {
        reject(false);
      });
  });
};
