import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "./connection/FirebaseConfig";
import Header from "./Header";
function Signup() {
  const emailRef = useRef();
  const pwdRef = useRef();
  const navigate = useNavigate();

  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (event) => {
    const newData = { ...data };
    newData[event.target.name] = event.target.value;
    setData(newData);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    await createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        navigate("/");
        emailRef.current.value = "";
        pwdRef.current.value = "";

        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorCode, errorMessage);
        // ..
      });
  };
  return (
    <>
      <div className="text-black">
        <Header />
      </div>
      <div className="pt-4">
        <div className="text-center mx-auto my-auto h-[28rem] w-[18rem] border border-cyan-800 rounded-2xl">
          <p className="font-bold my-10 text-[20px] text-yellow-50">Check in</p>
          <form onSubmit={onSubmit} className="flex flex-col mx-4">
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
              minLength={6}
            />
            <button
              type="submit"
              className="mt-8 rounded-lg border border-cyan-600 text-yellow-50 py-2 hover:shadow-xl active:scale-105"
            >
              Click Here
            </button>
            <p className="text-[12px] text-yellow-50 mt-2">
              Are you Existing?
              <Link to="/">
                <label className="underline ml-1 hover:opacity-60 cursor-pointer">
                  Sign in
                </label>
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
}

export default Signup;
