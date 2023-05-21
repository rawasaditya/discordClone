import { toast } from "react-toastify";

const login = (email, password) => {
  fetch("/api/auth/login", {
    method: "POST",
    headers: {
      accept: "application.json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ email, password }),
  })
    .then((res) => {
      if (res.status === 400) return res.text();
      return res.json();
    })
    .then((res) => {
      if (typeof res === "string") {
        toast.error(res);
      } else {
        toast.error(res.message);
      }
    });
};

const register = (email, password, firstName, lastName, rePassword) => {
  if (password !== rePassword) {
    toast.error("Passwords do not match, Please re-enter again");
    return;
  } else {
    fetch("/api/auth/register", {
      method: "POST",
      headers: {
        accept: "application.json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password, firstName, lastName }),
    })
      .then((res) => {
        if (res.status === 400) return res.text();
        return res.json();
      })
      .then((res) => {
        if (typeof res === "string") {
          toast.error(res);
        } else {
          toast.error(res.message);
        }
      });
  }
};
export { login, register };
