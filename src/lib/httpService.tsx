import axios from "axios";

export interface Cookies {
  access_token: string;
}

const httpService = axios.create({
  withCredentials: true,
});

export const httpServiceTransaction = axios.create();

export default httpService;
