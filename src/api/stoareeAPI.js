import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get("stoaree");

export default axios.create({
  baseURL: 'http://localhost:3001/',
  headers: { Authorization: token }
});