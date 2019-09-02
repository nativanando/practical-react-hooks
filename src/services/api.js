import fetch from 'isomorphic-unfetch';

const endpoint = 'http://localhost:8000';

const createHeaders = (auth) => {
  const headers = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  if (auth !== undefined && auth !== '') {
    return {
      ...headers,
      Authorization: `Bearer ${auth}`,
    };
  }

  return headers;
};

const config = (method, auth, body) => ({
  method,
  body,
  headers: createHeaders(auth),
  mode: 'cors',
});

export function get(path, auth) {
  return fetch(`${endpoint}${path}`, config('GET', auth));
}

export function post(path, params, auth) {
  return fetch(`${endpoint}${path}`, config('POST', auth, JSON.stringify(params)));
}

export function put(path, params, auth) {
  return fetch(`${endpoint}${path}`, config('PUT', auth, JSON.stringify(params)));
}

export function remove(path, auth) {
  return fetch(`${endpoint}${path}`, config('DELETE', auth));
}