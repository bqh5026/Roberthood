import axios from "axios";
const instance = axios.create({
  baseURL: "https://roberthood-edcdd.firebaseio.com/",
});

export default instance; 