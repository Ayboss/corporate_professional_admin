import { toast } from "react-toastify";
/* eslint-disable @typescript-eslint/no-explicit-any */
export const errorMessage = (err: any, message?: string) => {
  console.log(err);

  let msg = err?.response?.data?.detail;
  if (typeof msg !== "string") {
    msg = err?.response?.data?.message;
  }
  if (typeof msg !== "string") {
    msg = message || "an errorOccured";
  }
  toast(msg, { type: "error" });
};

export const successMessage = (message: string) => {
  toast(message, { type: "success" });
};
