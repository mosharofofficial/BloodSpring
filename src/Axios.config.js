import axios from "axios";

const myAxios = axios.create({
  baseURL: "http://localhost:5000",
});

<<<<<<< HEAD
const myAxiosSecure = axios.create({
  baseURL: "http://localhost:5000",
  headers: {
    authorization: `Bearer ${localStorage.getItem("access-token")}`,
  },
=======

const myAxiosSecure = axios.create({
  baseURL: "http://localhost:5000"
>>>>>>> 12ec375f63a17df63ce591264dc738ff3d841519
});

export { myAxios, myAxiosSecure };
