"use client";
import CPbutton from "@/components/CPbutton";
import CPInput from "@/components/CPInput";
import useUser from "@/statestore/useUser";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";
import useSWRMutation from "swr/mutation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { errorMessage, successMessage } from "@/utils/toastalert";
import { LoginSchema, TLoginSchema } from "@/types/admin";
import { loginAdmin } from "@/functions/admin";
import bgimg from "@/assets/loginbg.png";
import Image from "next/image";
import { cplogo } from "@/assets";

export default function Login() {
  const setUser = useUser((state) => state.setUser);
  const router = useRouter();
  const { trigger, isMutating } = useSWRMutation("auth/login", loginAdmin);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TLoginSchema>({
    resolver: zodResolver(LoginSchema),
  });
  const onSubmit = async (data: TLoginSchema) => {
    try {
      const response = await trigger(data);
      setUser(response);
      successMessage("Login Successful");
      router.push("/");
      /* eslint-disable @typescript-eslint/no-explicit-any */
    } catch (err: any) {
      // Account not verified. Please check your email
      // push to Verify, or Verify modal
      errorMessage(err);
    }
  };
  return (
    <main
      className="flex flex-col gap-6 items-center h-screen pt-[50]  pb-6 px-6"
      style={{
        backgroundImage: `url(${bgimg.src})`,
        backgroundPosition: "center",
      }}
    >
      <Link href={"/"} className="self-start ml-[100]">
        <Image src={cplogo} width={120} height={37} alt="log" />
      </Link>
      <div className="bg-white p-[18] rounded-2xl max-w-[445px] w-full careershadow">
        <form className="" onSubmit={handleSubmit(onSubmit)}>
          <h3 className="mb-6 text-lg font-medium">
            Log In to your account ✨
          </h3>
          <CPInput
            {...register("email")}
            error={errors.email?.message}
            type="email"
            placeholder="Email Address"
          />
          <CPInput
            {...register("password")}
            type="password"
            placeholder="Password"
            error={errors.password?.message}
          />
          <div className="flex justify-end mb-6 text-sm">
            {/* <p className="text-[#E62E2E] ">{error && "Incorrect password"}</p> */}
            <button className="cursor-pointer" type="button">
              Forgot password?
            </button>
          </div>
          <CPbutton className="w-full" type="submit" loading={isMutating} />
          <p className="text-center text-sm text-[#64748B]">
            Don’t have an account?{" "}
            <Link href={"/onboarding"} className="text-slate">
              Sign up
            </Link>
          </p>
          <div className="flex items-center my-6">
            <span className="flex-1 h-px bg-[#E2E8F0]"></span>
            <span className="mx-3 text-sm">Or</span>
            <span className="flex-1 h-px bg-[#E2E8F0]"></span>
          </div>
        </form>
      </div>
    </main>
  );
}
