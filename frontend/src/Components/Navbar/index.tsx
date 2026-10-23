import "./Navbar.css";
import { MaybeAuthenticatedUser } from "../../types";

interface NavBarProps {
  authenticatedUser: MaybeAuthenticatedUser;
  clearUser: () => void;
}

const NavBar = ({ authenticatedUser, clearUser }: NavBarProps) => {

  if (authenticatedUser) {
    return (
      <nav>
        <button onClick={() => clearUser()}>Se déconnecter</button>
      </nav>
    );
  }

  
};

export default NavBar;
