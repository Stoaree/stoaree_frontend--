import axios from 'axios';

export const getStory = () => {
  return axios.get("http://localhost:3001/stories/5e2669e5480c6704e31f39bd").then((response) => {
    return response.data;
  })
};

export const getStories = () => {
  return axios.get("https://polar-castle-01694.herokuapp.com/stories").then((response) => {
    return response.data;
  })
};