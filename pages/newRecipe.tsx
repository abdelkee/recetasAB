import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/router";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { MdLocalDining, MdOutlineAdd, MdPhotoCamera } from "react-icons/md";
import AuthWrapper from "../components/AuthWrapper";
import Header from "../components/Header";
import IngredientCard from "../components/IngredientCard";
import StepCard from "../components/StepCard";
import Switch from "../components/Switch";
import { RecipeData } from "../types";
import { createRecipe } from "../utils/axiosApi";

const modes = ["horno", "sarten", "olla", "micro"];
const measurements = ["tbsp", "tsp", "cup", "gr", "kg", "ml", "l", "u"];
export default function NewRecipe() {
  // ---- HOOKS
  const [tab, setTab] = useState<"ingredients" | "steps">("ingredients");
  const [ingredients, setIngredients] = useState<RecipeData["ingredients"]>([]);
  const [steps, setSteps] = useState<RecipeData["steps"]>([]);
  const [modos, setModos] = useState<RecipeData["mode"]>(["horno"]);
  const [isOpen, setIsOpen] = useState(false);
  const { mutate, isLoading, data } = useMutation((recipe: RecipeData) =>
    createRecipe(recipe)
  );

  const { register, handleSubmit } = useForm();
  const {
    register: registerIng,
    handleSubmit: handleIngSubmit,
    reset: resetIng,
  } = useForm();
  const {
    register: registerStep,
    handleSubmit: handleStepSubmit,
    reset: resetSteps,
  } = useForm();

  const { replace } = useRouter();
  // ---- FUNCTIONS

  if (data) replace("/recipes");

  const removeIngredient = (title: string) => {
    setIngredients((curr) => curr.filter((ingr) => ingr.title !== title));
  };
  const removeStep = (stepToRemove: string) => {
    setSteps((curr) => curr.filter((step) => step !== stepToRemove));
  };
  const checkHandler = ({
    target: { value },
  }: React.ChangeEvent<HTMLInputElement>) => {
    if (modos.includes(value)) {
      setModos((curr) => curr.filter((mode) => mode !== value));
    } else {
      setModos((curr) => [...curr, value]);
    }
  };
  const submitRecipe = handleSubmit(({ title, image }) => {
    if (!title || !ingredients.length || !steps.length)
      return alert("Add title, ingredients and steps");
    const newRecipe: RecipeData = {
      title,
      // image: image[0],
      mode: modos,
      ingredients,
      steps,
    };

    mutate(newRecipe);
  });
  const submitIngredients = handleIngSubmit(
    ({ title, quantity, measurement }) => {
      setIngredients((curr) => [...curr, { title, quantity, measurement }]);
      resetIng();
    }
  );
  const submitSteps = handleStepSubmit(({ step }) => {
    setSteps((curr) => [...curr, step]);
    resetSteps();
  });

  // ---- JSX
  return (
    <AuthWrapper>
      <Header title="New recipe" />
      <section className="relative h-screen px-2 py-20">
        <form id="mainForm" onSubmit={submitRecipe}>
          <label className="w-full h-[100px] bg-slate-200 border border-dashed border-gray-300 flex justify-center items-center text-gray-400 rounded-sm">
            <MdPhotoCamera size={"24px"} />
            <input
              type="file"
              className="absolute hidden"
              disabled
              {...register("image")}
            />
          </label>
          <input
            type="text"
            className="w-full p-3 mt-6 border border-gray-200 rounded-sm focus:outline-none focus:border-lime-500"
            placeholder="Recipe title"
            required
            {...register("title")}
          />
          <div className="mt-6">
            <h2 className="mb-2 text-sm text-gray-400">Modo de cocinar</h2>
            <div className="grid grid-cols-4 gap-3">
              {modes.map((mode, i) => (
                <label
                  key={mode}
                  className={`${
                    modos.includes(mode)
                      ? "bg-purple-500 text-lime-50"
                      : "bg-white"
                  } p-2 rounded-sm shadow-sm flex justify-center items-center font-medium text-sm tracking-wide capitalize`}
                >
                  <h4>{mode}</h4>
                  <input
                    type="checkbox"
                    className="absolute hidden"
                    onChange={checkHandler}
                    value={mode}
                    defaultChecked={i === 0}
                  />
                </label>
              ))}
            </div>
          </div>

          <button className="p-2 z-30 rounded-sm absolute bottom-2 left-[50%] -translate-x-1/2 w-[95%] bg-lime-500 text-lime-100 font-semibold tracking-wider text-lg">
            {isLoading ? "creating..." : "submit"}
          </button>
        </form>
        <div className="flex items-center justify-between py-4 mt-6 space-x-4">
          <button
            onClick={() => {
              setTab("ingredients");
              setIsOpen(true);
            }}
            className="flex flex-col items-center justify-center flex-1 p-4 space-y-4 text-lg font-bold tracking-wider bg-yellow-500 shadow aspect-square text-yellow-50"
          >
            <h3>Ingredients</h3>
            <span className="flex items-center justify-center w-10 h-10 p-4 rounded-full bg-lime-50 text-lime-500">
              {ingredients.length}
            </span>
          </button>
          <button
            onClick={() => {
              setTab("steps");
              setIsOpen(true);
            }}
            className="flex flex-col items-center justify-center flex-1 p-4 space-y-4 text-lg font-bold tracking-wider bg-yellow-500 shadow aspect-square text-yellow-50"
          >
            <h3>Steps</h3>
            <span className="flex items-center justify-center w-10 h-10 p-4 rounded-full bg-lime-50 text-lime-500">
              {steps.length}
            </span>
          </button>
        </div>
      </section>

      {tab === "ingredients" && (
        <Tab isOpen={isOpen} close={() => setIsOpen(false)}>
          <section>
            {ingredients.map((ingr) => (
              <IngredientCard
                key={ingr.title}
                ingredient={ingr}
                removable
                remove={() => removeIngredient(ingr.title)}
              />
            ))}
          </section>
          <form
            id="ingredientsForm"
            onSubmit={submitIngredients}
            className="mt-6"
          >
            <div className="flex items-center space-x-2">
              <input
                type="text"
                className="w-16 p-2 border border-gray-300 rounded-sm"
                placeholder="Qty"
                defaultValue={"1"}
                required
                {...registerIng("quantity")}
              />
              <select {...registerIng("measurement")}>
                {measurements.map((meas, i) => (
                  <option key={meas} value={meas}>
                    {meas}
                  </option>
                ))}
              </select>
            </div>
            <div className="flex items-center justify-between mt-2 space-x-4">
              <input
                type="text"
                className="w-full p-2 border border-gray-300 rounded-sm"
                placeholder="Ingedient"
                required
                {...registerIng("title")}
              />
              <button className="h-full p-2 aspect-square bg-lime-500 text-lime-50">
                <MdOutlineAdd size={"24px"} />
              </button>
            </div>
          </form>
        </Tab>
      )}

      {tab === "steps" && (
        <Tab isOpen={isOpen} close={() => setIsOpen(false)}>
          {steps.map((step, i) => (
            <StepCard
              key={step}
              index={i}
              step={step}
              removable
              remove={() => removeStep(step)}
            />
          ))}
          <form
            id="stepsForm"
            onSubmit={submitSteps}
            className="flex items-center justify-between space-x-4"
          >
            <input
              type="text"
              className="w-full p-2 border border-gray-300 rounded-sm focus:outline-none focus:border-lime-500"
              placeholder="Step"
              autoFocus
              required
              {...registerStep("step")}
            />
            <button className="h-full p-2 aspect-square bg-lime-500 text-lime-50">
              <MdOutlineAdd size={"24px"} />
            </button>
          </form>
        </Tab>
      )}
    </AuthWrapper>
  );
}

function Tab({
  children,
  isOpen,
  close,
}: {
  children: React.ReactNode;
  isOpen: boolean;
  close: () => void;
}) {
  if (!isOpen) return null;
  return (
    <>
      <div
        role={"button"}
        onClick={close}
        className="fixed inset-0 z-40 w-full h-screen bg-black/60"
      />
      <div className="fixed inset-0 top-[20%] rounded-t-2xl left-[50%] px-4 py-8 -translate-x-1/2 w-[98%] bg-white z-50 overflow-y-auto">
        {children}
      </div>
    </>
  );
}
