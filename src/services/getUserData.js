import axios from 'axios';

export const getUserData = (id) => {
  return axios.get(`http://localhost:3001/users/${id}`).then((response) => {
    return response;
  }).catch((err) => {
    console.log(err);
  })
};



