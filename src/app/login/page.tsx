"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useLazyTestApiQuery } from "../features/onboarding/testApi";
import { getToken } from "next-auth/jwt";
const Page = () => {
  const { data: session, status, update } = useSession();
  const route = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [
    triggerTest,
    { data: apiData, isLoading: apiLoading, error: apiError },
  ] = useLazyTestApiQuery();
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
  useEffect(() => {
    console.log("TOKEN:", session?.backendToken);
  }, [session]);

  if (status === "unauthenticated") {
    return <div onClick={() => handleLogin()}>Login</div>;
  }
  if (status === "authenticated" && session.backendError) {
    return (
      <div>
        <div>Err:{session.backendError}</div>
        <button type="button" onClick={() => signOut()}>
          Logout
        </button>
      </div>
    );
  }
  return (
    <div>
      <div>{session?.user.email}</div>
      <button type="button" onClick={() => triggerTest()}>
        Click to test api
      </button>
      <p>{apiData?.email}</p>
      {apiError && (
        <p>{"data" in apiError ? (apiError.data as any).error : "0"} </p>
      )}
      <button type="button" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default Page;
