import React, { useRef } from "react";
import { toast } from "react-toastify";

const Login = ({ setLogin }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const login = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
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
  return (
    <div className="flex items-center justify-center h-screen align-middle lg:gap-6 lg:px-24 loginPage">
      <div className="border-t-2 shadow-xl card border-slate-300 bg-base-100 h-fit ">
        <div className="card-body">
          <span className="w-full text-2xl font-semibold text-center text-slate-500">
            Login
          </span>
          <form className="flex flex-col gap-5 my-4" onSubmit={login}>
            <input
              type="email"
              required
              placeholder="Enter registered email"
              className="w-full input border-slate-300"
              ref={emailRef}
            />
            <input
              type="password"
              placeholder="Enter password"
              className="w-full input border-slate-300"
              ref={passwordRef}
            />
            <div className="justify-center card-actions">
              <button className="bg-green-400 border-green-500 rounded-full outline-none btn hover:bg-green-500 px-9 btn-sm ">
                Login
              </button>
            </div>
          </form>
          <p>
            If you don't have an account{" "}
            <span
              onClick={() => setLogin(false)}
              className="cursor-pointer text-primary"
            >
              click here
            </span>{" "}
            to register
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
