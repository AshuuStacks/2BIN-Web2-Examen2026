interface Reponse {
  id: number;
  question: string;
  reponse: string;
}

type NewReponse = Omit<Reponse, "id">;


interface PizzeriaContext {
  reponses: Reponse[];
  setReponses: (reponses: Reponse[]) => void;
  addReponse: (newReponse: NewReponse) => Promise<void>;

  loginUser: (user: User) => Promise<void>;
}

interface User {
  username: string;
  password: string;
}

interface AuthenticatedUser {
  username: string;
  token: string;
}

type MaybeAuthenticatedUser = AuthenticatedUser | undefined;

export type {
  Reponse,
  NewReponse,
  PizzeriaContext,
  User,
  AuthenticatedUser,
  MaybeAuthenticatedUser,
};
