import axios from "axios";
import { getItem } from "../helpers/persistance-storage";

axios.defaults.baseURL = "https://api.realworld.io/api";

axios.interceptors.request.use((config) => {
	const token = getItem("token");

	const Autorization = token ? `Token ${token}` : "";

    config.headers.Authorization = Autorization;
    
	return config;
});

export default axios;
