import Image from "next/image";
import Link from "next/link";
import { RecipeType } from "../types";

type Props = {
  recipe: Omit<RecipeType, "ingredients" | "steps">;
};
export default function RecipeCard({ recipe }: Props) {
  // ---- HOOKS
  // ---- FUNCTIONS
  // ---- JSX

  return (
    <Link
      href={"/recipes/" + recipe._id}
      role={"button"}
      className="w-full overflow-hidden bg-white border border-gray-200 rounded shadow"
    >
      <section className="h-[100px] flex p-1 space-x-4 items-center">
        <div className="relative aspect-square h-full overflow-hidden rounded-sm">
          <Image
            alt=""
            src={recipe?.image || ""}
            fill
            className="object-cover"
          />
        </div>
        <div className="py-2">
          <h2 className="font-medium capitalize mb-1">{recipe.title}</h2>
          <div className="flex space-x-2 items-center">
            {recipe.mode.map((mode, i, arr) => (
              <>
                <h4 className="capitalize text-gray-400 text-sm">{mode}</h4>
                {i !== arr.length - 1 && (
                  <span className="text-gray-400">&bull;</span>
                )}
              </>
            ))}
          </div>
        </div>
      </section>
    </Link>
  );
}
