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
      className="w-full overflow-hidden bg-white border border-gray-200 rounded shadow"
    >
      <section className="relative aspect-square">
        <Image alt="" src={recipe?.image || ""} fill className="object-cover" />
        <div className="absolute left-0 flex items-center w-full h-10 px-2 -space-x-1 -top-2">
          {recipe.mode.map((mode) => (
            <div
              className="z-20 flex items-center justify-center w-8 h-8 border rounded-full bg-slate-50 border-slate-200"
              key={mode}
            >
              <Image
                alt={mode}
                src={`/icons/${mode}.png`}
                width={18}
                height={18}
              />
            </div>
          ))}
        </div>
      </section>
      <section className="relative flex flex-col items-center p-4 bg-white">
        <h2 className="text-xl font-medium tracking-wider text-center capitalize">
          {recipe.title}
        </h2>
      </section>
    </Link>
  );
}
