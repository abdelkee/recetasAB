import { useRouter } from "next/router";
import { useEffect } from "react";

export default function HomePage() {
  // ---- HOOKS
  const router = useRouter();
  useEffect(() => {
    router.replace("/recipes");
  }, []);
  // ---- FUNCTIONS
  // ---- JSX
  return null;
}
