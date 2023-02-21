import { useQuery } from "@tanstack/react-query";
import AuthWrapper from "../../components/AuthWrapper";
import FAB from "../../components/FAB";
import RecipeCard from "../../components/RecipeCard";
import { getRecipes } from "../../utils/axiosApi";
import Loader from "../../utils/Loader";

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
        <Loader />
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
      <div className="flex flex-col items-center w-full px-4 py-24 space-y-4">
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
