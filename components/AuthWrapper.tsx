import { signIn, useSession } from "next-auth/react";
import { MdOutlineVpnKey } from "react-icons/md";
import Loader from "../utils/Loader";

type Props = {
  children: React.ReactNode;
};
export default function AuthWrapper({ children }: Props) {
  // ---- HOOKS
  const { status } = useSession();
  // ---- FUNCTIONS
  // ---- JSX
  if (status === "loading") return <Loader />;
  if (status === "unauthenticated")
    return (
      <button
        className="p-4 rounded-sm space-x-4 shadow bg-lime-500 text-white font-medium fixed top-[50%] left-[50%] -translate-x-1/2 flex   "
        onClick={() => signIn()}
      >
        <h4>Log in</h4>
        <MdOutlineVpnKey size={"24px"} />
      </button>
    );
  return <>{children}</>;
}
