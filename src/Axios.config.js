import axios from "axios";

const myAxios = axios.create({
  baseURL: "https://b9a12-server-side-rasc3ta.vercel.app",
});

const myAxiosSecure = axios.create({
  baseURL: "https://b9a12-server-side-rasc3ta.vercel.app",
  headers: {
    authorization: `Bearer ${localStorage.getItem("access-token")}`,
  },
});

export { myAxios, myAxiosSecure };
