import { useState, useRef } from "react";
import { useNavigate } from "react-router";

import { projectFirestore } from "../../firebase/config";

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    const doc = {
      title,
      ingredients,
      method,
      cookingTime: cookingTime + " minutes",
    };

    try {
      await projectFirestore.collection("recipes").add(doc);
      navigate("/");
    } catch (error) {
      console.error(`Couldn't add recipe ${error.message}`);
    }
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const ing = newIngredient.trim();

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
      <h2 className="page-title">Add a New Recipe</h2>

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
