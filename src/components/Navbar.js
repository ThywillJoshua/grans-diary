import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

//styles
import "./Navbar.css";

//components
import Searchbar from "./Searchbar";

export default function Navbar() {
  const { color } = useTheme();

  return (
    <div className="navbar" style={{ background: color }}>
      <nav>
        <Link to="/" className="brand">
          <h1 className="emoji">👵🏽 Grans Diary </h1>
          <h1 className="no-emoji"> Grans Diary </h1>
        </Link>
        <Searchbar />
        <Link to="/create"> Create Recipe </Link>
      </nav>
    </div>
  );
}
