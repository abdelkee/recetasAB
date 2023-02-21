import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/router";
import { useState } from "react";
import AuthWrapper from "../../components/AuthWrapper";
import Header from "../../components/Header";
import IngredientsList from "../../components/IngredientsList";
import StepsList from "../../components/StepsList";
import Switch from "../../components/Switch";
import { getRecipe } from "../../utils/axiosApi";
import Loader from "../../utils/Loader";

type tabType = "ingredients" | "steps";
export default function Recipe() {
  // ---- HOOKS
  const [tab, setTab] = useState<tabType>("ingredients");
  const router = useRouter();
  const id = router.query.id as string;
  const {
    data: recipe,
    isLoading,
    isError,
  } = useQuery({
    queryKey: [id],
    queryFn: () => getRecipe(id),
  });
  console.log(recipe?.image);

  // ---- FUNCTIONS
  if (isLoading) return <Loader />;
  if (isError) return <p>Error...</p>;

  // ---- JSX
  return (
    <AuthWrapper>
      <Header title={recipe.title} />
      <section className="px-2 my-20">
        <div className="relative w-full overflow-hidden bg-white border border-gray-300 rounded aspect-video">
          <Image
            alt={recipe.title}
            src={recipe?.image || ""}
            fill
            className="object-cover p-2"
          />
        </div>
        <div className="flex items-center justify-between py-4 space-x-4">
          <Switch
            title="ingredients"
            currTab={tab}
            defaultChecked={true}
            switchTab={() => setTab("ingredients")}
          />
          <Switch
            title="steps"
            currTab={tab}
            switchTab={() => setTab("steps")}
          />
        </div>
        {tab === "ingredients" && <IngredientsList data={recipe.ingredients} />}
        {tab === "steps" && <StepsList data={recipe.steps} />}
      </section>
    </AuthWrapper>
  );
}
