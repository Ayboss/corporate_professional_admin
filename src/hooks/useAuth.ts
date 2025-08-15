"use client";
import useUser from "@/statestore/useUser";
import httprequest from "@/utils/httpRequest";
import { getData } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import useSWRMutation from "swr/mutation";
// import useSWR from "swr";

function useAuth() {
  const router = useRouter();

  const setuser = useUser((state) => state.setUser);

  const { trigger } = useSWRMutation("/profiles/me", async (url: string) => {
    const { data } = await httprequest.get(url);
    if (!data.is_admin) {
      router.push("/login");
      throw new Error("Account is not an admin");
    }
    setuser(data);
  });

  useEffect(() => {
    // check if access token, add it to the header
    const access_token = getData("access_token");
    if (access_token) {
      httprequest.defaults.headers.common[
        "Authorization"
      ] = `Bearer ${access_token}`;
      trigger();
    } else {
      router.push("/login");
    }
  }, [router, trigger]);

  useEffect(() => {
    const responseInterceptor = httprequest.interceptors.response.use(
      (response) => response,
      (error) => {
        if (error.response?.status === 401) {
          console.warn("401 detected, redirecting to login...");
          router.push("/login");
        }
        return Promise.reject(error);
      }
    );

    return () => {
      httprequest.interceptors.response.eject(responseInterceptor);
    };
  }, [router]);

  return null;
}

export default useAuth;
