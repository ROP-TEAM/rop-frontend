"use client";

import { signOut } from "next-auth/react";

const isProtect = () => {
  return (
    <div>
      <p>Hello middleware</p>
      <button type="button" onClick={() => signOut()}>
        Logout
      </button>
    </div>
  );
};

export default isProtect;
