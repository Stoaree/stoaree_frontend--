import axios from 'axios';

export const getUserData = (id) => {
  // console.log(id);
  return axios.get(`http://localhost:3001/users/${id}`).then((response) => {
    return response;
  }).catch((err) => {
    console.log(err);
  })
};

export const updateUserData = (id, url) => {

  const fullToken = document.cookie;
  const token = fullToken.split("=");
  token.pop();

  return axios.put(`http://localhost:3001/users/avatar_update/${id}`, {
    avatarURL: url
  }, ({ headers: {Authorization: token[0]}})).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.error(error);
  })
};



