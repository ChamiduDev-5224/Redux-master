import React, { useState, useRef } from "react";
import { collection, addDoc } from "firebase/firestore";
import { connection } from "./connection/FirebaseConfig";
function Form() {
  const [description, setDescription] = useState("");
  const ref = useRef(null);

  const userCollectionRef = collection(connection, "thoughts");

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addDoc(userCollectionRef, {
      idNum: Math.floor(Math.random() * 100),
      Description: description,
    });
    ref.current.value = "";
  };
  return (
    <div>
      <div className="h-screen">
        <p className="overflow-hidden text-yellow-50 text-center font-bold pt-20 mx-8 text-[30px]">
          The process is about what will happend in 2023 ? you can guess Eg: May
          I fing a new job
        </p>
        <div className="flex flex-col mt-10 ">
          <form className="flex flex-col mx-4 md:mx-60" onSubmit={handleSubmit}>
            <textarea
              name="Description"
              cols="30"
              rows="5"
              ref={ref}
              className="rounded-xl"
              onChange={(event) => {
                setDescription(event.target.value);
              }}
              required
            />
            <button
              className="mt-10 border rounded-lg hover:drop-shadow-2xl text-yellow-50 active:drop-shadow-2xl"
              type="submit"
            >
              Click Here
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default Form;
