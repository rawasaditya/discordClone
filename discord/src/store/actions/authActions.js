import * as api from "../../api";
export const authActions = {
  SET_USER_DETAILS: "AUTH.SET_USER_DETAILS",
};

export const getActions = (dispatch) => {
  return {
    login: (userDetails, history) => dispatch(login(userDetails, history)),
    register: (userDetails, history) =>
      dispatch(register(userDetails, history)),
    setUserDetails: (userDetails) => dispatch(setUserDetails(userDetails)),
  };
};

const setUserDetails = (userDetails) => {
  return {
    type: authActions.SET_USER_DETAILS,
    userDetails,
  };
};

const login = (userDetails, history) => {
  return async (dispatch) => {
    const response = await api.login(userDetails);
    if (!response?.error) {
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch(setUserDetails(response.data));
      history("/dashboard");
    }
  };
};

const register = (userDetails, history) => {
  return async (dispatch) => {
    const response = await api.register(userDetails);
    if (!response?.error) {
      localStorage.setItem("user", JSON.stringify(response.data));
      dispatch(setUserDetails(response.data));
      history("/dashboard");
    }
  };
};
