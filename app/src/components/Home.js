import React, { useEffect } from "react";
import Store from "../redux/store/Store";
import { Toast, Table } from "flowbite-react";
import { AddTask, RemoveTask, UpdateTask } from "../redux/action/Action";
import { useState } from "react";
import undraw_new_year_2023 from "../assets/img/undraw_new_year_2023.svg";
import Header from "./Header";
import FooterPage from "./Footer";
import { connection } from "./connection/FirebaseConfig";
import { collection, doc, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./connection/FirebaseConfig";
function Home() {
  const [showToast, setShowToast] = useState("");
  const [fetchData, setFetchData] = useState([]);
  const [loggedUser, setLoggedUser] = useState("");
  const userCollectionRef = collection(connection, "thoughts");

  useEffect(() => {
    const getData = async () => {
      const data = await getDocs(userCollectionRef);
      setFetchData(
        data?.docs?.map((outputs) => ({ ...outputs.data(), id: doc.id }))
      );
    };
    getData();
    getUserInfo();
  }, []);

  const getUserInfo = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedUser(user.email);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        // ...
        console.log("uid", uid);
      } else {
        // User is signed out
        // ...
        console.log("user is logged out");
      }
    });
  };

  const handleClick = () => {
    const randomId = Math.random(1, 600);
    Store.dispatch(AddTask(randomId));
    Store.dispatch(RemoveTask(3));
    Store.dispatch(UpdateTask(5));
    setShowToast(true);
    // AddReducer("task added");
    // RemoveReducer(1);
    console.log(Store.getState());
  };
  return (
    <div>
      <div className="bg-gray-800">
        <Header loggedUser={loggedUser} />
        <div className="show-toast h-16 w-[16rem] mx-auto my-auto md:w-[22rem] md:ml-16">
          {showToast ? (
            <Toast className="w-[17rem]">
              <div className="inline-flex h-4 w-10 shrink-0 items-center justify-center rounded-lg bg-green-100 text-green-500 dark:bg-green-800 dark:text-green-200">
                <img src={undraw_new_year_2023} alt="" />
              </div>
              <div className="ml-3 text-[12px] font-normal">
                Item moved successfully.
              </div>
              <Toast.Toggle className="ml-4 p-1" />
            </Toast>
          ) : (
            ""
          )}
        </div>
        <div className="pt-4 flex flex-col justify-center items-center space-x-5 md:flex-row  ">
          <button
            type="button"
            className="text-white ml-5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800 w-60 md:w-24 mt-2 h-[42px] "
            onClick={handleClick}
          >
            Default
          </button>
          <form className="flex items-center w-60 md:w-[40%]">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <svg
                  aria-hidden="true"
                  className="w-5 h-5 text-gray-500 dark:text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                    clipRule="evenodd"
                  ></path>
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search"
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ml-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                ></path>
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        <div className="main-svg m-auto flex justify-center">
          <img
            src={undraw_new_year_2023}
            className=" object-cover my-[50px] w-[400px] px-10 ml-11 overflow-hidden"
          />
        </div>
        <div className=" flex flex-row justify-center overflow-hidden ">
          <div className="overflow-y-auto h-48 scrol relative shadow-md sm:rounded-lg">
            <table className="w-[600px] text-sm text-left  text-gray-500 dark:text-gray-400 ">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3 px-6">
                    #
                  </th>
                  <th scope="col" className="py-3 px-6">
                    ID
                  </th>
                  <th scope="col" className="py-3 px-5">
                    DESCRIPTION
                  </th>
                </tr>
              </thead>
              <tbody>
                {fetchData.map((data, index) => {
                  return (
                    <tr
                      className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                      key={data.idNum}
                    >
                      <td className="py-4 px-6">{++index}</td>
                      <td className="py-4 px-6">{data.idNum}</td>
                      <th
                        scope="row"
                        className="py-4 px-6 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                      >
                        {data.Description}
                      </th>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
        {console.log(Store.getState())}
        <div className="mt-48">
          <FooterPage />
        </div>
      </div>
    </div>
  );
}

export default Home;
