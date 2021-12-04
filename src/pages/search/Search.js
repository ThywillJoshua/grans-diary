import { useSearchParams } from "react-router-dom";
import useFetch from "../../hooks/useFetch";

//styles
import "./Search.css";

//components
import RecipeList from "../../components/RecipeList";

export default function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const query = searchParams.get("q");
  const url = `http://localhost:3000/recipes?q=${query}`;

  const { data: recipes, isPending, error } = useFetch(url);

  return (
    <div>
      <h2 className="page-title">Recipes including "{query}"</h2>
      {error && <p className="error">{error}</p>}
      {isPending && <p className="loading">Loading...</p>}
      {recipes && <RecipeList recipes={recipes} />}
    </div>
  );
}
