import axios from "axios";

const fullToken = document.cookie;
const token = fullToken.split("=");
token.pop();

export default axios.create({
  baseURL: 'http://localhost:3001/',
  headers: { Authorization: token[0] }
});