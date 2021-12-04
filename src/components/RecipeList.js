import { Link } from "react-router-dom";
import { useTheme } from "../hooks/useTheme";

//styles
import "./RecipeList.css";

export default function RecipeList({ recipes }) {
  const { mode } = useTheme();

  if (recipes.length === 0) {
    return <div className="recipe-list">Sorry, no recipes found..</div>;
  }

  return (
    <div className="recipe-list">
      {recipes.map((recipe) => {
        return (
          <div key={recipe.id} className={`card ${mode}`}>
            <h3>{recipe.title}</h3>
            <p>{recipe.cookingTime} to make.</p>
            <div>{recipe.method.substring(0, 80).concat("...")}</div>
            <Link to={`/recipes/${recipe.id}`}>Cook this</Link>
          </div>
        );
      })}
    </div>
  );
}
