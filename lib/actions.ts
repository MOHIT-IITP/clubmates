"use server";

import { executeAction } from "./executeAction";

const singUp = async (_formData: FormData) => {
  return executeAction({
    actionFn: async () => {},
    successMessage: "Guest access is enabled. Redirecting you to the app.",
  });
};

export { singUp };
