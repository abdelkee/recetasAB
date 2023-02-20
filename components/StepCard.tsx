import { useState } from "react";
import {
  MdOutlineCheckBox,
  MdOutlineCheckBoxOutlineBlank,
  MdRemoveCircle,
} from "react-icons/md";

type Props = {
  step: string;
  index: number;
  removable?: boolean;
  remove?: () => void;
};
export default function StepCard({
  step,
  index,
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
    <div className="p-2">
      <div className="flex items-center justify-between">
        <span
          className={`${
            isChecked && "border-l-2 border-l-lime-500"
          } py-1 px-2 rounded-sm bg-yellow-200 font-medium text-sm`}
        >{`Step ${index + 1}`}</span>
        {!removable && (
          <button onClick={toggle}>
            {isChecked ? (
              <MdOutlineCheckBox className="text-lime-500" size={"24px"} />
            ) : (
              <MdOutlineCheckBoxOutlineBlank size={"24px"} />
            )}
          </button>
        )}
        {removable && (
          <button onClick={remove} className="text-red-800">
            <MdRemoveCircle size={"24px"} />
          </button>
        )}
      </div>
      <p className={`${isChecked && "border-l-2 border-l-lime-500"} p-1`}>
        {step}
      </p>
    </div>
  );
}
