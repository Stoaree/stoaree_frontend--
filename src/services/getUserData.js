import axios from 'axios';

export const getUserData = () => {
  return axios.get("http://localhost:3001/users/5e2669da480c6704e31f39bc").then((response) => {
    return response;
  })
};



