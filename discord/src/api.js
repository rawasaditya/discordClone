import { toast } from "react-toastify";
import axios from "axios";
import packageJSON from "../package.json";
import { logout } from "./utils/authUtils";

const apiClient = axios.create({
  baseURL: `${packageJSON.proxy}/api`,
  timeout: 1000,
});

apiClient.interceptors.request.use(
  (config) => {
    const userDetails = localStorage.getItem("user");
    if (userDetails) {
      const token = JSON.parse(userDetails).token;
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export const login = async (data) => {
  try {
    return await apiClient.post("/auth/login", data);
  } catch (exception) {
    toast.error(
      exception.response.data.message
        ? exception.response.data.message
        : exception.response.data
    );

    return { error: exception };
  }
};

export const register = async ({
  email,
  password,
  firstName,
  lastName,
  rePassword,
}) => {
  try {
    if (password !== rePassword) {
      toast.error("Passwords do not match, Please re-enter again");
      return { error: "Passwords do not match, Please re-enter again" };
    }
    return await apiClient.post("/auth/register", {
      email,
      password,
      firstName,
      lastName,
    });
  } catch (exception) {
    return {
      error: exception,
    };
  }
};

export const isAuth = async () => {
  try {
    return await apiClient.get("auth/isAuth");
  } catch (exception) {
    return {
      error: exception,
    };
  }
};

export const sendFriendInvitation = async (data) => {
  try {
    return await apiClient.post("friend-invitation/invite", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};
export const getAllFriendInvites = async (data) => {
  try {
    return await apiClient.get("friend-invitation/getAllInvites", data);
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

export const acceptFriendInvitation = async (data) => {
  try {
    return await apiClient.post("friend-invitation/acceptRejectInvite", {
      ...data,
      accept: true,
    });
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};
export const rejectFriendInvitation = async (data) => {
  try {
    return await apiClient.post("friend-invitation/acceptRejectInvite", {
      ...data,
      accept: false,
    });
  } catch (exception) {
    checkResponseCode(exception);
    return {
      error: true,
      exception,
    };
  }
};

const checkResponseCode = (exception) => {
  const responseCode = exception?.response?.status;
  if (responseCode) (responseCode === 401 || responseCode === 401) && logout();
};
