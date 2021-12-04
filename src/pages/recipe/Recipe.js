import { useParams, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";

//styles
import "./Recipe.css";

export default function Recipe() {
  const { id } = useParams();
  const url = `http://localhost:3000/recipes/${id}`;

  const { data: recipe, isPending, error } = useFetch(url);

  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error, navigate]);

  return (
    <div className="recipe">
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.CookingTime} to cook</p>
          <ul>
            {recipe.ingredients.map((ing) => {
              return <li key={ing}>{ing}</li>;
            })}
          </ul>

          <p className="method">{recipe.method}</p>
        </>
      )}
    </div>
  );
}
