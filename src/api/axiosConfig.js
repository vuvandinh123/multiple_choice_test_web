import axios from "axios";
import AppURL from "./AppURL";

const instance = axios.create({
    baseURL: AppURL.API_URL,
    headers: {
        "Content-Type": "application/json",
    }
})
export default instance