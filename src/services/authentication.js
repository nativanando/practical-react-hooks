export const TOKEN_KEY = 'token';

export const isAuthenticated = () => {
  if (localStorage.getItem(TOKEN_KEY) === null || localStorage.getItem(TOKEN_KEY) === 'undefined') {
    return false;
  } else {
    return true;
  }
}

export const getToken = () => localStorage.getItem(TOKEN_KEY);

export const setToken = token => {
  localStorage.setItem(TOKEN_KEY, token);
};

export const removeToken = () => {
  localStorage.removeItem(TOKEN_KEY);
};