import { RecipeType } from "../types";
import StepCard from "./StepCard";

type Props = {
  data: RecipeType["steps"];
};
export default function StepsList({ data }: Props) {
  // ---- HOOKS
  // ---- FUNCTIONS
  // ---- JSX
  return (
    <div className="mt-4">
      {data?.map((step, i) => (
        <StepCard key={step} index={i} step={step} />
      ))}
    </div>
  );
}
