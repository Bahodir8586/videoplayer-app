import axios from "axios";

const instance = axios.create({
  baseURL: "https://dev.gift.routeam.ru/api/",
});

export default instance;
