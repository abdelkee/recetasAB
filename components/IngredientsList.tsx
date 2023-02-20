import { RecipeType } from "../types";
import IngredientCard from "./IngredientCard";

type Props = {
  data: RecipeType["ingredients"];
};
export default function IngredientsList({ data }: Props) {
  // ---- HOOKS
  // ---- FUNCTIONS
  // ---- JSX
  return (
    <div className="mt-4 ">
      {data?.map((ingr) => (
        <IngredientCard key={ingr.title} ingredient={ingr} />
      ))}
    </div>
  );
}
