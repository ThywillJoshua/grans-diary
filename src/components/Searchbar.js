import { useState } from "react";
import { useNavigate } from "react-router";

//styles
import "./Searchbar.css";

export default function Searchbar() {
  const [term, setTerm] = useState("");

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    navigate(`/search?q=${term}`);
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <label>
          <input
            type="text"
            placeholder="Search..."
            onChange={(e) => setTerm(e.target.value.trim())}
            required
          />
        </label>
      </form>
    </div>
  );
}
