import axios from "axios";
import { getData } from "./storage";

const httprequest = axios.create({
  baseURL: "https://atlas.corporatesandprofessionals.com/api/",
});

// check if authtoken has been, if not, get it from the localstorage and attach it

// Request interceptor
httprequest.interceptors.request.use(
  (config) => {
    // If no Authorization header is already set
    // console.log("here first", config.headers["Authorization"]);
    if (!config.headers["Authorization"]) {
      const token = getData("access_token");
      // console.log(token, "Token");
      if (token) {
        // console.log("adds token");
        config.headers["Authorization"] = `Bearer ${token}`;
      }
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default httprequest;
