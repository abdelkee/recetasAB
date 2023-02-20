import { useRouter } from "next/router";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

type Props = {
  title: string;
};
export default function Header({ title }: Props) {
  // ---- HOOKS
  const { replace } = useRouter();
  // ---- FUNCTIONS
  // ---- JSX
  return (
    <div className="py-3 px-4 shadow bg-white flex fixed top-0 left-0 w-full z-30">
      <button onClick={() => replace("/recipes")}>
        <MdOutlineKeyboardBackspace size={"24px"} />
      </button>
      <h3 className="text-lg font-medium up flex-1 text-center">{title}</h3>
    </div>
  );
}
