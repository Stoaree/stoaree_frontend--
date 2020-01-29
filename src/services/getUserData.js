import axiosAPI from "../api/stoareeAPI"

export const getUserData = (id) => {
  return axiosAPI.get(`/users/${id}`).then((response) => {
    return response;
  }).catch((err) => {
    console.log(err);
  })
};
