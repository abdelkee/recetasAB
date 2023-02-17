import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/router";

export default function Akee() {
  // ---- HOOKS
  const { status } = useSession();
  const router = useRouter();
  // ---- FUNCTIONS

  // ---- JSX
  if (status === "loading") return <p>Loading ...</p>;
  if (status === "unauthenticated")
    return <button onClick={() => signIn()}>Log in</button>;
  return (
    <div>
      <div>logged in</div>
    </div>
  );
}
