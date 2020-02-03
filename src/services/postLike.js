import axiosAPI from "../api/stoareeAPI"

export const addLike = (storyId) => {
  return axiosAPI.put("/likes", {
      story_id: storyId
  }).then((response) => {
    return response.data;
  }).catch((err) => {
    console.log(err);
  })
};
