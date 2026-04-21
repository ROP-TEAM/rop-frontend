"use client";

import { signIn, signOut, useSession } from "next-auth/react";
import { useEffect, useState } from "react";
import { useLazyTestApiQuery } from "../features/onboarding/testApi";

const Page = () => {
  const { data: session, status } = useSession();
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
      await signIn("google", {
        callbackUrl: "/",
      });
    } catch (err) {
      console.log("login error", err);
      setError("Login failed");
      setIsLoading(false);
    }
  };

  useEffect(() => {
    console.log("TOKEN:", session?.backendToken);
  }, [session]);

  if (status === "loading") return <div>Loading...</div>;

  if (status === "unauthenticated") {
    return <div onClick={handleLogin}>Login</div>;
  }

  if (session?.backendError) {
    return (
      <div>
        <p>{session.backendToken}</p>
        <div>Err: {session.backendError}</div>
        {apiError && (
          <p>{"data" in apiError ? (apiError.data as any).error : "0"}</p>
        )}
        <button onClick={() => signOut()}>Logout</button>
      </div>
    );
  }

  return (
    <div>
      <div>{session?.user?.email}</div>

      <button onClick={() => triggerTest()}>Click to test api</button>

      <p>{apiData?.email}</p>

      {apiError && (
        <p>{"data" in apiError ? (apiError.data as any).error : "0"}</p>
      )}

      <button onClick={() => signOut()}>Logout</button>
    </div>
  );
};

export default Page;
