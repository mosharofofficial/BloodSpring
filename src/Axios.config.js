import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://localhost:5000",
});

const myAxiosSecure = axios.create({
  baseURL: "http://localhost:5000",
});

export { myAxios, myAxiosSecure };
