import { useState } from "react";
import {
  MdCircle,
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdRemoveCircle,
} from "react-icons/md";
import { IngredientType } from "../types";

type Props = {
  ingredient: IngredientType;
  removable?: boolean;
  remove?: () => void;
};
export default function IngredientCard({
  ingredient,
  removable = false,
  remove,
}: Props) {
  // ---- HOOKS
  const [isChecked, setIsChecked] = useState(false);
  // ---- FUNCTIONS
  const toggle = () => {
    setIsChecked((curr) => !curr);
  };
  // ---- JSX
  return (
    <div
      className={`${
        isChecked && "border-l-2 border-l-lime-500"
      } p-2 flex items-center justify-between`}
    >
      <div className="flex items-center space-x-2">
        <MdCircle size={"6px"} />

        <p>
          <span>{ingredient.quantity + " "}</span>
          <span className="font-semibold">{ingredient.measurement + " "}</span>
          {ingredient.title}
        </p>
      </div>
      {removable && (
        <button onClick={remove} className="text-red-800">
          <MdRemoveCircle size={"24px"} />
        </button>
      )}
      {!removable && (
        <button onClick={toggle}>
          {isChecked ? (
            <MdOutlineCheckBox className="text-lime-500" size={"24px"} />
          ) : (
            <MdOutlineCheckBoxOutlineBlank size={"24px"} />
          )}
        </button>
      )}
    </div>
  );
}
