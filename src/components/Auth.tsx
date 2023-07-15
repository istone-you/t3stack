import { signIn } from "next-auth/react";

export const Auth = () => {
  return (
    <div>
      <button
        className="rounded bg-blue-600 px-4 py-2 font-bold text-white hover:bg-blue-600"
        onClick={() => signIn("github")}
      >
        GitHub Auth
      </button>
    </div>
  );
};
