import axios from "axios";

const API = axios.create({
   baseURL: "https://hospital-disease-prediction-system.onrender.com/api",
  headers: {
    "Content-Type": "application/json",
  },
});

export default API;