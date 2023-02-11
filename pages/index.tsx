import { useUser } from "@auth0/nextjs-auth0/client";
import type { NextPage } from "next";
import LoginButton from "../components/LoginButton";
import LogoutButton from "../components/LogoutButton";

const Home: NextPage = () => {
  const { user, error, isLoading } = useUser();

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>{error.message}</div>;

  return (
    <>
      {user ? (
        <div>
          <p>Home page</p>
          <LogoutButton />
        </div>
      ) : (
        <LoginButton />
      )}
    </>
  );
};

export default Home;
