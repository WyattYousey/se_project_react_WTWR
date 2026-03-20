const baseUrl = "http://localhost:3001";

function headers() {
  const token = localStorage.getItem("jwt");
  return {
    headers: {
      "Content-Type": "application/json",
      authorization: `Bearer ${token}`,
    },
  };
}

export const handleServerResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Error: ${res.status}`);
};

const request = (url, options) => {
  return fetch(url, options).then(handleServerResponse);
};

export const getItems = () => {
  return request(`${baseUrl}/items`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
};

export const addItem = ({ name, imageUrl, weather }) => {
  return request(`${baseUrl}/items`, {
    method: "POST",
    ...headers(),
    body: JSON.stringify({
      name,
      imageUrl,
      weather,
    }),
  });
};

export const removeItem = (itemId) => {
  return request(`${baseUrl}/items/${itemId}`, {
    method: "DELETE",
    ...headers(),
  });
};

export const signup = ({ name, avatar, email, password }) => {
  return request(`${baseUrl}/signup`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ name, avatar, email, password }),
  });
};

export const signin = ({ email, password }) => {
  return request(`${baseUrl}/signin`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  });
};

export const getCurrentUser = () => {
  return request(`${baseUrl}/users/me`, {
    ...headers(),
  });
};

export const editUserProfile = ({ name, avatar }) => {
  return request(`${baseUrl}/users/me`, {
    method: "PATCH",
    ...headers(),
    body: JSON.stringify({ name, avatar }),
  });
};

export const addCardLike = (id) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "PATCH",
    ...headers(),
  });
};

export const removeCardLike = (id) => {
  return request(`${baseUrl}/items/${id}/likes`, {
    method: "DELETE",
    ...headers(),
  });
};
