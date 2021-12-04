import { useState, useRef, useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import { useNavigate } from "react-router";

//styles
import "./Create.css";

export default function Create() {
  const [title, setTitle] = useState("");
  const [method, setMethod] = useState("");
  const [cookingTime, setCookingTime] = useState("");
  const [newIngredient, setNewIngredient] = useState("");
  const [ingredients, setingredients] = useState([]);

  const ingredientInput = useRef(null);

  const navigate = useNavigate();

  const { postData, data, error } = useFetch(
    "http://localhost:3000/recipes",
    "POST"
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    postData({
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    });
  };

  useEffect(() => {
    if (data) {
      navigate("/");
    }
  }, [data, navigate]);

  const handleAdd = (e) => {
    e.preventDefault();
    const ingTrimmed = newIngredient.trim();
    const ing = ingTrimmed[0].toUpperCase() + ingTrimmed.slice(1).toLowerCase();

    if (!ing || ingredients.includes(ing)) {
      setNewIngredient("");
      return alert("Already added");
    }

    setingredients((prevIng) => [...prevIng, ing]);
    setNewIngredient("");
    ingredientInput.current.focus();
  };

  return (
    <div className="create">
      <h1 className="page-title">Add a New Recipe</h1>

      <form onSubmit={handleSubmit}>
        <label>
          <span>Recipe title:</span>
          <input
            type="text"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
            required
          />
        </label>

        <label>
          <span>Recipe Ingredients:</span>
          <div className="ingredients">
            <input
              type="text"
              onChange={(e) => setNewIngredient(e.target.value)}
              value={newIngredient}
              ref={ingredientInput}
            />
            <button className="btn" onClick={handleAdd}>
              Add
            </button>
          </div>
          <p>
            Current Ingredients:{" "}
            {ingredients.map((ing) => (
              <i key={ing}>{ing}, </i>
            ))}
          </p>
        </label>

        <label>
          <span>Recipe method:</span>
          <textarea
            onChange={(e) => setMethod(e.target.value)}
            value={method}
            required
          />
        </label>

        <label>
          <span>Cooking Time (minutes):</span>
          <input
            type="number"
            onChange={(e) => setCookingTime(e.target.value)}
            value={cookingTime}
            required
          />
        </label>

        <button className="btn">Submit</button>
      </form>
    </div>
  );
}
