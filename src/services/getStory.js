import axios from 'axios';

export const getStory = () => {
  return axios.get("http://localhost:3001/stories").then((response) => {
    return response.data;
  }).catch((err) => {
    console.log(err);
  })
};

export const getStories = () => {
  return axios.get("http://localhost:3001/stories").then((response) => {
    return response.data;
  }).catch((err) => {
    console.log(err);
  })
};