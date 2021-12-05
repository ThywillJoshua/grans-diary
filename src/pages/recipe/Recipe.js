import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

import { useTheme } from "../../hooks/useTheme";
import { projectFirestore } from "../../firebase/config";

//styles
import "./Recipe.css";

export default function Recipe() {
  const { mode } = useTheme();
  const { id } = useParams();

  const [recipe, setRecipe] = useState(null);
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    setIsPending(true);

    projectFirestore
      .collection("recipes")
      .doc(id)
      .get()
      .then((doc) => {
        if (doc.exists) {
          setIsPending(false);
          setRecipe(doc.data());
        } else {
          setIsPending(false);
          setError("No recipe found!");
        }
      });
  }, [id]);

  //navigate back on error
  const navigate = useNavigate();

  useEffect(() => {
    if (error) {
      setTimeout(() => {
        navigate("/");
      }, 3000);
    }
  }, [error, navigate]);

  return (
    <div className={`recipe ${mode}`}>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipe && (
        <>
          <h2 className="page-title">{recipe.title}</h2>
          <p>Takes {recipe.cookingTime} to cook</p>
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
