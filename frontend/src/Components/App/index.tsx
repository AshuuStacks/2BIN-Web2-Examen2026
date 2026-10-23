import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import "./App.css";
import Footer from "../Footer";
import {
  NewReponse,
  User,
  Reponse,
  PizzeriaContext,
  AuthenticatedUser,
  MaybeAuthenticatedUser,
} from "../../types";
import NavBar from "../Navbar";
import {
  clearAuthenticatedUser,
  getAuthenticatedUser,
  storeAuthenticatedUser,
} from "../../utils/session";


const App = () => {
  const [reponses, setReponses] = useState<Reponse[]>([]);
  const [authenticatedUser, setAuthenticatedUser] =
    useState<MaybeAuthenticatedUser>(undefined);

  useEffect(() => {
    fetchReponses();
    const authenticatedUser = getAuthenticatedUser();
    if (authenticatedUser) {
      setAuthenticatedUser(authenticatedUser);
    }
  }, []);

  const fetchReponses = async () => {
    try {
      const reponses = await getAllReponses();
      setReponses(reponses);
    } catch (err) {
      console.error("HomePage::error: ", err);
    }
  };

  async function getAllReponses() {
    try {
      const response = await fetch("/api/reponses");

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const reponses = await response.json();

      return reponses;
    } catch (err) {
      console.error("getAllReponses::error: ", err);
      throw err;
    }
  }

  const addReponse = async (newReponse: NewReponse) => {
    try {
      if(!authenticatedUser)  {
        throw new Error("You must be authenticated to add a reponse");
      }
      const options = {
        method: "POST",
        body: JSON.stringify(newReponse),
        headers: {
          "Content-Type": "application/json",
          Authorization: authenticatedUser.token,
        },
      };

      const response = await fetch("/api/reponses", options); // fetch retourne une "promise" => on attend la réponse

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const createdReponse = await response.json(); // json() retourne une "promise" => on attend les données

      setReponses([...reponses, createdReponse]);
    } catch (err) {
      console.error("AddReponse::error: ", err);
    }
  };

 

  const loginUser = async (user: User) => {
    try {
      const options = {
        method: "POST",
        body: JSON.stringify(user),
        headers: {
          "Content-Type": "application/json",
        },
      };

      const response = await fetch("/api/auths/login", options);

      if (!response.ok)
        throw new Error(
          `fetch error : ${response.status} : ${response.statusText}`
        );

      const authenticatedUser: AuthenticatedUser = await response.json();
      console.log("authenticatedUser: ", authenticatedUser);

      setAuthenticatedUser(authenticatedUser);
      storeAuthenticatedUser(authenticatedUser);
    } catch (err) {
      console.error("loginUser::error: ", err);
      throw err;
    }
  };

  const clearUser = () => {
    clearAuthenticatedUser();
    setAuthenticatedUser(undefined);
  }


  

  const fullReponseContext: PizzeriaContext = {
    addReponse,
    reponses,
    setReponses,
    loginUser,
  };

  return (
    <div className="page">
      <main>
        <NavBar authenticatedUser={authenticatedUser} clearUser={clearUser}/>
        <Outlet context={fullReponseContext} />
      </main>
      <Footer />
    </div>
  );
};

export default App;
