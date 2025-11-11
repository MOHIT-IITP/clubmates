import { Github } from "@/components/ui/github";
import { Button } from "./ui/button";
import { signIn } from "@/lib/auth";

const GithubSignIn = () => {
  return (
    <form
      action={async () => {
        "use server";
        await signIn("github");
      }}
    >
      <Button
       className="w-full hover:text-white hover:border-white hover:bg-neutral-500 bg-white border border-gray-800 border-dashed shadow-md text-black " >
        <Github />
        Continue with GitHub
      </Button>
    </form>
  );
};

export { GithubSignIn };
