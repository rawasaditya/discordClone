import { useRef } from "react";
import { register } from "../api.js";
const Register = ({ setLogin }) => {
  const emailRef = useRef();
  const passwordRef = useRef();
  const rePasswordRef = useRef();
  const firstNameRef = useRef();
  const lastNameRef = useRef();

  const submitRegister = (e) => {
    e.preventDefault();
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const rePassword = rePasswordRef.current.value;
    const firstName = firstNameRef.current.value;
    const lastName = firstNameRef.current.value;
    register(email, password, firstName, lastName, rePassword);
  };
  return (
    <div className="flex items-center justify-center h-screen align-middle lg:gap-6 lg:px-24 loginPage">
      <div className="border-t-2 shadow-xl card border-slate-300 bg-base-100 h-fit ">
        <div className="card-body">
          <span className="w-full text-2xl font-semibold text-center text-slate-500">
            Register
          </span>
          <form className="flex flex-col gap-5 my-4" onSubmit={submitRegister}>
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full input border-slate-300"
              ref={emailRef}
            />
            <input
              type="text"
              required
              placeholder="Enter your First Name"
              className="w-full input border-slate-300"
              ref={firstNameRef}
            />
            <input
              type="text"
              placeholder="Enter your Last Name"
              className="w-full input border-slate-300"
              ref={lastNameRef}
            />
            <input
              type="password"
              placeholder="Enter your Password"
              className="w-full input border-slate-300"
              ref={passwordRef}
              required
            />
            <input
              type="password"
              placeholder="Re-Enter password"
              className="w-full input border-slate-300"
              ref={rePasswordRef}
              required
            />
            <div className="justify-center card-actions">
              <button className="bg-green-400 border-green-500 rounded-full outline-none btn hover:bg-green-500 px-9 btn-sm ">
                Register
              </button>
            </div>
          </form>
          <p>
            Already have an account?
            <span
              onClick={() => setLogin(true)}
              className="cursor-pointer text-primary"
            >
              click here
            </span>{" "}
            to login
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
