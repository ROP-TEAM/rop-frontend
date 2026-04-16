"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const Page = () => {
  const { data: session, status, update } = useSession();
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    if (isLoading) return;

    setIsLoading(true);
    setError("");

    try {
      await signIn("google", { redirect: false });

      const newSession = await update();

      console.log("SESSION:", newSession);

      if (newSession?.backendError) {
        setError(newSession.backendError);
        return;
      }

      route.push("/");
    } catch (error) {
      console.log("something went wrong");
    } finally {
      setIsLoading(false);
    }
  };

  if (status === "unauthenticated") {
    return <div onClick={() => handleLogin()}>Login</div>;
  }
  if (status === "authenticated" && session.backendError) {
    return <div>Err:{session.backendError}</div>;
  }
  return (
    <div>
      <p>{session?.backendError}</p>

      <button type="button" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default Page;
