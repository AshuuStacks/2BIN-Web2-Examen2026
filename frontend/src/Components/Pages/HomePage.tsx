import { useState, SyntheticEvent } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import { PizzeriaContext } from "../../types";
import { getAuthenticatedUser } from "../../utils/session";

const questions: string[] = [
    "Quels sont selon vous les points forts de notre service ?",
    "Quels aspects de notre service pourraient être améliorés ?",
    "Y a-t-il des fonctionnalités ou des services supplémentaires que vous aimeriez voir ?",
];
const HomePage = () => {
  const { loginUser , addReponse }: PizzeriaContext = useOutletContext();
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [submission, setSubmission] = useState("");
    const [count, setCount] = useState(0);


  const handleSubmit = async (e: SyntheticEvent) => {
    e.preventDefault();
    try {
      await loginUser({ username, password });
      navigate("/");
    } catch (err) {
        setError("Données incorrectes!");
      console.error("LoginPage::error: ", err);
    }
  };
   const [reponse, setReponse] = useState("");

  const handleSubmitt = (e: SyntheticEvent) => {
    
    e.preventDefault();
    addReponse({ reponse: reponse, question: questions[count] });
    setSubmission("Survey submitted successfully!");
    navigate("/");
  };

  const handleUsernameInputChange = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setUsername(input.value);
  };

  const handlePasswordChange = (e: SyntheticEvent) => {
    const input = e.target as HTMLInputElement;
    setPassword(input.value);
  };




  const handleReponseChange = (e: SyntheticEvent) => {
    const reponseInput = e.target as HTMLInputElement;
    console.log("change in reponseInput:", reponseInput.value);
    setReponse(reponseInput.value);
  };

 

 if(!getAuthenticatedUser()){
return (
    <div>
                <h1>Survey App</h1>
        <div>
        <h1> La question  : {questions[count]}</h1>
     {count>0 &&<button  onClick={() => setCount((count) => count - 1)}
     >Previous</button> }
    

        <h4> Question n° {count+1}/{questions.length}</h4>
        {count<questions.length-1 &&<button  onClick={() => setCount((count) => count + 1)}
     >Next</button> }





        </div>
        <div>
      <form onSubmit={handleSubmitt}>

        <label htmlFor="reponse">Reponse</label>
        <input
          value={reponse}
          type="text"
          id="reponse"
          name="reponse"
          onChange={handleReponseChange}
          required
        />
       
      </form>
    </div>
      
      <h1>Connectez un utilisateur</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username</label>
        <input
          value={username}
          type="text"
          id="username"
          name="username"
          onChange={handleUsernameInputChange}
          required
        />
        <label htmlFor="password">Password</label>
        <input
          value={password}
          type="text"
          id="password"
          name="password"
          onChange={handlePasswordChange}
          required
        />
        <button type="submit">Login</button>
      </form>
      <h3>{error}</h3>
    </div>
  );

 } else{
  return (
    <div>
        <h1>Survey App</h1>
     <h1> La question  : {questions[count]}</h1>
     {count>0 &&<button  onClick={() => setCount((count) => count - 1)}
     >Previous</button> }
    

        <h4> Question n° {count+1}/{questions.length}</h4>
        {count<questions.length-1 &&<button  onClick={() => setCount((count) => count + 1)}
     >Next</button> }


        <div>
      <form onSubmit={handleSubmitt}>
        <label htmlFor="reponse">Réponse</label>
        <input
          value={reponse}
          type="text"
          id="reponse"
          name="reponse"
          onChange={handleReponseChange}
          required
        />
    
        <button type="submit">Submit Survey </button>
      </form>
    </div>
      <h3>{error}</h3>
      <h3>{submission}</h3>
    </div>
     
  );
};

 }

export default HomePage;
