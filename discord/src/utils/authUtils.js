import { isAuth } from "../api";
export const logout = () => {
  localStorage.removeItem("user");
  window.location.pathname = "/login";
};

export const isAuthenticated = async () => {
  const resp = await isAuth();
  if (resp?.error?.response?.status) {
    if (resp?.error?.response?.status !== 200) {
      return false;
    }
    if (resp?.status === 200) {
      return true;
    }
  }
  return true;
};
