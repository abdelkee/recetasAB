import { useRouter } from "next/router";
import { MdOutlineKeyboardBackspace } from "react-icons/md";

type Props = {
  title: string;
  back?: boolean;
};
export default function Header({ title, back = true }: Props) {
  // ---- HOOKS
  const { replace } = useRouter();
  // ---- FUNCTIONS
  // ---- JSX
  return (
    <div className="fixed top-0 left-0 z-30 flex w-full px-4 py-3 bg-white shadow">
      {back && (
        <button onClick={() => replace("/recipes")}>
          <MdOutlineKeyboardBackspace size={"24px"} />
        </button>
      )}
      <h3 className="flex-1 text-xl font-medium text-center up">{title}</h3>
    </div>
  );
}
