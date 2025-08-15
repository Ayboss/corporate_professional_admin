import { TLoginSchema } from "@/types/admin";
import httprequest from "@/utils/httpRequest";
import { storeData } from "@/utils/storage";
import { errorMessage } from "@/utils/toastalert";

export const loginAdmin = async (
  url: string,
  { arg }: { arg: TLoginSchema }
) => {
  const urlencoded = new URLSearchParams();
  urlencoded.append("username", arg.email);
  urlencoded.append("password", arg.password);
  const response = await httprequest.post("auth/login", urlencoded, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });
  if (!response.data.user.is_admin) {
    throw { response: { data: { message: "Incorrect login details" } } };
  }
  httprequest.defaults.headers.common[
    "Authorization"
  ] = `Bearer ${response.data.access_token}`;
  if (!response.data.user.is_admin) {
    throw new Error("Account is not an admin");
  }
  storeData("access_token", response.data.access_token);
  storeData("refresh_token", response.data.refresh_token);
  return response.data.user;
};
