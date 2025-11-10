"use client";

import { Button } from "./ui/button";

// import { Button } from "/components/ui/button.tsx";

const SignOut = () => {
  const handleSignOut = async () => {
  };

  return (
    <div className="flex justify-center">
      <Button onClick={handleSignOut}>
        Sign Out
      </Button>
    </div>
  );
};

export { SignOut };
