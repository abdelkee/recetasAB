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
      className="fixed p-4 rounded-full shadow text-lime-50 bg-lime-500 bottom-6 right-6"
    >
      <MdOutlineAdd size={"24px"} />
    </Link>
  );
}
