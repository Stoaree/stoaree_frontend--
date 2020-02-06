import axios from "axios";
import Cookies from 'universal-cookie';

const cookies = new Cookies();
const token = cookies.get("stoaree");

export default axios.create({
  baseURL: 'https://polar-castle-01694.herokuapp.com/',
  headers: { Authorization: token }
});
