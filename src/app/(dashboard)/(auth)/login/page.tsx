"use client";

import { signIn, useSession } from "next-auth/react";
import { useEffect } from "react";

const LoginPage = () => {
  const { data: session } = useSession();


  useEffect(() => {
    const token = (session as any)?.backendToken;


    if (token) {
      localStorage.setItem("access_token", token);

    }
  }, [session]);

  return (
    <button onClick={() => signIn("google")}>
      Login Google
    </button>
  );
};

export default LoginPage;