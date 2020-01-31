import axiosAPI from "../api/stoareeAPI"

export const getStory = () => {
  return axiosAPI.get("/stories").then((response) => {
    return response.data;
  }).catch((err) => {
    console.log(err);
  })
};

export const getStories = () => {
  return axiosAPI.get("/stories").then((response) => {
    return response.data;
  }).catch((err) => {
    console.log(err);
  })
};