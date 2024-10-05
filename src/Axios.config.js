import axios from "axios";

const myAxios = axios.create({
  // baseURL: "https://b9a12-server-side-rasc3ta.vercel.app",
  baseURL: "http://localhost:5000",
});

const myAxiosSecure = axios.create({
  // baseURL: "https://b9a12-server-side-rasc3ta.vercel.app",
  baseURL: "http://localhost:5000",
  // headers: {
  //   authorization: `Bearer ${localStorage.getItem("access-token")}`,
  // },
});

export { myAxios, myAxiosSecure };
