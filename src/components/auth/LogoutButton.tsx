"use client";

import { signOut } from "next-auth/react";

export default function LogoutButton({
  children,
}: {
  children?: React.ReactNode;
}) {
  return (
    <button onClick={() => signOut({ callbackUrl: "/login" })} className="">
      {children || "Sign out"}
    </button>
  );
}
