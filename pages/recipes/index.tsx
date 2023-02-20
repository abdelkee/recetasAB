import { useQuery } from "@tanstack/react-query";
import AuthWrapper from "../../components/AuthWrapper";
import FAB from "../../components/FAB";
import RecipeCard from "../../components/RecipeCard";
import { getRecipes } from "../../utils/axiosApi";

export default function Recipes() {
  // ---- HOOKS
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["recipes"],
    queryFn: getRecipes,
  });
  // ---- FUNCTIONS
  // ---- JSX
  if (isLoading)
    return (
      <AuthWrapper>
        <p>loading ...</p>
      </AuthWrapper>
    );
  if (isError)
    return (
      <AuthWrapper>
        <p>{JSON.stringify(error)}</p>
      </AuthWrapper>
    );
  return (
    <AuthWrapper>
      <div className="grid grid-cols-2 gap-4 px-2 py-20">
        {data?.map((recipe) => {
          const recipeData = {
            _id: recipe._id,
            title: recipe.title,
            image: recipe.image,
            mode: recipe.mode,
          };
          return <RecipeCard key={recipe._id} recipe={recipeData} />;
        })}
      </div>
      <div>
        <FAB />
      </div>
    </AuthWrapper>
  );
}
