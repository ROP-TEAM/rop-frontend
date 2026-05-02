"use client";

import { useSession } from "next-auth/react";

export const Topbar = () => {
  const { data: session, status } = useSession();

  return <div>
    
  </div>;
};
