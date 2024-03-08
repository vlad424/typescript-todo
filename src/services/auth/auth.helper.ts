import Cookies from "js-cookie";
import { TokensResponse, userTokens } from "../../types/User";

export const saveTokens = (data: userTokens) => {
  Cookies.set("accessToken", data.accessToken);
  Cookies.set("refreshToken", data.refreshToken);
};

export const reomveTokens = () => {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  localStorage.removeItem('user')
};

export const getAccessToken = () => {
  const acccessToken = Cookies.get("accesstoket");
  return acccessToken || null;
};

export const saveToStorage = (data: TokensResponse) => {
  saveTokens(data);
  localStorage.setItem("user", JSON.stringify(data.user));
};

export const getUser = async () => {
  return JSON.parse(localStorage.getItem("user") || "{}");
};
