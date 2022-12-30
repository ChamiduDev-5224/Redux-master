import Login from "./components/Login";
import Home from "./components/Home";
import Form from "./components/Form";
import Signup from "./components/Signup";
import NotFound from "./components/NotFound";
import { Route, Routes } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./components/connection/FirebaseConfig";
import { ProtectedRoute } from "./context/ProtectedRoute";
function App() {
  const [loggedUser, setLoggedUser] = useState("");
  useEffect(() => {
    getUserInfo();
  }, []);
  const getUserInfo = () => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedUser(user.email);
      } else {
        console.log("user is logged out");
      }
    });
  };

  return (
    <>
      <div className="h-screen bg-slate-900 ">
        <Routes>
          <Route exact path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute user={loggedUser}>
                <Home />
              </ProtectedRoute>
            }
          />
          <Route path="/form" element={<Form />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
