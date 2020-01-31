import axios from "axios";

const fullToken = document.cookie;
const token = fullToken.split("=");

export default axios.create({
  baseURL: 'https://polar-castle-01694.herokuapp.com/',
  headers: { Authorization: token[1] }
});
