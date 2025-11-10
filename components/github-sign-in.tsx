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
       className="w-full bg-white text-black " >
        <Github />
        Continue with GitHub
      </Button>
    </form>
  );
};

export { GithubSignIn };
