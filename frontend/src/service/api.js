import axios from "axios"

const API = axios.create({
  baseURL: "https://fixit-ce61.onrender.com/api"
})

export default API