import {getSession} from "next-auth/react";

export default async function Dashboard() {
  const session = await getSession();
  const user = session?.user?.name; // Assuming 'role' is part of the session object

  return <div>heyfdkdjqsfkl </div>;
}
