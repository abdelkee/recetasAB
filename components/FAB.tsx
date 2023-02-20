import { MdOutlineAdd } from "react-icons/md";
import Link from "next/link";

type Props = {};
export default function FAB({}: Props) {
  // ---- HOOKS
  // ---- FUNCTIONS
  // ---- JSX
  return (
    <Link
      href={"/newRecipe"}
      className="fixed p-3 rounded-full shadow bg-lime-500 bottom-4 right-4"
    >
      <MdOutlineAdd size={"24px"} />
    </Link>
  );
}
