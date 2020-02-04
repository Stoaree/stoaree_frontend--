import axiosAPI from "../api/stoareeAPI"

export const getUserData = (id) => {
  return axiosAPI.get(`/users/${id}`).then((response) => {
    console.log(response.data);

    return response;
  }).catch((err) => {
    console.log(err);
  })
};

export const updateUserData = (id, url) => {
  return axiosAPI.put(`/users/avatar_update/${id}`, {
    avatarURL: url
  }).then(function (response) {
    console.log(response);
  }).catch(function (error) {
    console.error(error);
  })
};
