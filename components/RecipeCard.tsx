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
  console.log(recipe.mode);

  return (
    <Link
      href={"/recipes/" + recipe._id}
      role={"button"}
      className="rounded overflow-hidden shadow"
    >
      <section className="relative aspect-square object-cover">
        <Image alt="" src={recipe?.image || ""} fill />
        <div className="absolute -bottom-4 left-0 w-full h-10 flex items-center px-2 -space-x-1">
          {recipe.mode.map((mode) => (
            <div className="bg-slate-50 border border-slate-200 rounded-full w-7 h-7 flex items-center justify-center z-20">
              <Image
                alt={mode}
                src={`/icons/${mode}.png`}
                width={16}
                height={16}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="relative p-4 flex flex-col items-center bg-white">
        <h2 className="font-medium tracking-wider capitalize">
          {recipe.title}
        </h2>
      </section>
    </Link>
  );
}
