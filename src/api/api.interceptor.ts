import axios from "axios";
import { errorCatch, getContentType } from "./api.helper";
import { getAccessToken, reomveTokens } from "../services/auth/auth.helper";
import { AuthService } from "../services/auth/auth.service";

export const instance = axios.create({
  baseURL: process.env.REACT_APP_baseURL,
  headers: getContentType(),
});

instance.interceptors.request.use((config) => {
  const accessToken = getAccessToken();

  if (config.headers && accessToken) {
    config.headers.Authorization = `Bearer ${accessToken}`;
  }

  return config;
});

instance.interceptors.request.use(
  (config) => config,
  async (error) => {
    const originalReq = error.config;

    if (
      (error.response.status === 401 ||
        errorCatch(error) === "jwt expired" ||
        errorCatch(error) === "jwt must be provided") &&
      error.config &&
      !error.config._isRetry
    ) {
      originalReq._isRetry = true;

      try {
        AuthService.getNewTokens()
        return instance.request(originalReq);
      } catch (e) {
        if (errorCatch(e) === "jwt expired") {
          reomveTokens()
        }
      }
    }
    throw error
  }
);
