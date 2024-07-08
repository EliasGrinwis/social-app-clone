"use client";

import {useSession} from "next-auth/react";
import {redirect} from "next/navigation";

export default function ClientPage() {
  const {data: session} = useSession({
    required: true,
    onUnauthenticated() {
      redirect("/api/auth/signin?callbackUrl=/");
    },
  });

  return (
    <div>
      <h1>Client Page</h1>
      <p>Session: {session?.user?.name}</p>
    </div>
  );
}
