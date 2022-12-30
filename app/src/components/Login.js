import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import googleSvg from "../assets/img/google.svg";
import errorSvg from "../assets/img/error.svg";
import { Link } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { Toast } from "flowbite-react";
import { auth } from "./connection/FirebaseConfig";
import Header from "./Header";

function Login() {
  const emailRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();
  const [data, setData] = useState({
    email: "",
    password: "",
  });
  const [showToast, setShowToast] = useState(true);

  const handleChange = (event) => {
    setShowToast("");
    const newData = { ...data };
    newData[event.target.name] = event.target.value;
    setData(newData);
  };

  const onLogin = (e) => {
    console.log(showToast);
    e.preventDefault();
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigate("/home");
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        setShowToast(false);
      });
  };
  return (
    <>
      <div className="text-black flex flex-col md:flex-row-reverse">
        <Header />
        {showToast === false ? (
          <>
            <Toast className="w-[17rem] my-auto mx-auto md:ml-[4rem]">
              <div className="inline-flex h-4 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <img src={errorSvg} alt="" />
              </div>
              <div className="ml-3 text-[12px] font-normal">
                Sorry! password or username wrong
              </div>
              <Toast.Toggle className="ml-4 p-1" />
            </Toast>
          </>
        ) : (
          ""
        )}
      </div>
      <div className="pt-4">
        <div className="text-center mx-auto my-auto h-[28rem] w-[18rem] border border-cyan-800 rounded-2xl">
          <p className="font-bold my-10 text-[20px] text-yellow-50">Check In</p>
          <form onSubmit={onLogin} className="flex flex-col mx-4">
            <input
              className="mt-2 rounded-lg hover:drop-shadow-2xl border-transparent"
              placeholder="Email"
              type="text"
              autoComplete="email"
              name="email"
              value={data.email}
              onChange={(e) => {
                handleChange(e);
              }}
              ref={emailRef}
              required
            />
            <input
              className="mt-2 rounded-lg hover:drop-shadow-2xl  border-transparent"
              placeholder="Password"
              type="password"
              name="password"
              autoComplete="current-password"
              value={data.password}
              onChange={(e) => {
                handleChange(e);
              }}
              ref={pwdRef}
              required
            />
            <button
              type="submit"
              className="mt-8 rounded-lg border border-cyan-600 text-yellow-50 py-2 hover:shadow-xl active:scale-105"
            >
              <div className="flex flex-row justify-center">
                <span className="ml-2">Click here</span>
              </div>
            </button>

            <p className="text-yellow-50">or</p>

            <button className="mt-1 rounded-lg border bg-slate-50 text-gray-600 py-2 hover:shadow-xl active:scale-105">
              <div className="flex flex-row gap-1 justify-center">
                <img src={googleSvg} />
                <p className="font-bold">Sign in</p>
              </div>
            </button>
            <p className="text-[12px] text-yellow-50">
              Are you new?
              <Link to="/signup">
                <label className="underline ml-1 hover:opacity-60 cursor-pointer">
                  Sign up
                </label>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Login;
