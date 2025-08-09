import { ArrowIcon } from "@/imagecomponents";
import Link from "next/link";
import { ButtonHTMLAttributes, ReactNode } from "react";
import CPspinnerLoader from "./CPspinnerLoader";

function CPbutton({
  loading = false,
  ...props
}: { loading?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button
      className={`rounded-full p-[15] text-center  w-full  text-white mb-4 text-sm flex items-center gap-1 justify-center ${
        loading ? "bg-[#b5b7ff]" : "bg-primary"
      }`}
      disabled={loading}
      {...props}
    >
      {loading && <CPspinnerLoader size={15} color="#ffffff" />}
      {props.children ? props.children : "Continue"}
    </button>
  );
}

export const CPbuttonTwo = ({
  children = "Join Us",
  className = "",
  link = "",
  arrowColor = "#fff",
  ...props
}: {
  className?: string;
  link?: string;
  arrowColor?: string;
  children?: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>) => {
  if (link) {
    return (
      <Link
        href={link}
        className={`bg-[#282A74] text-white text-sm px-6 py-3 rounded-full font-medium flex items-center justify-center gap-1 ${className} `}
        style={props.style}
      >
        {children}
        <ArrowIcon color={arrowColor} />
      </Link>
    );
  }
  return (
    <button
      className={`bg-[#282A74] text-white text-sm px-6 py-3 rounded-full font-medium flex items-center justify-center gap-1 ${className} disabled:bg-[#6B6EAF]`}
      {...props}
    >
      {children}
      <ArrowIcon />
    </button>
  );
};

export const CPbuttonThree = ({
  link = "",
  ...props
}: { link?: string } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  if (link) {
    return (
      <Link
        href={link}
        className="border border-[#282A74] bg-transparent text-[#282A74] text-sm px-6 py-3 rounded-full font-medium"
        style={props.style}
      >
        {props.children || "Learn more"}
      </Link>
    );
  }
  return (
    <button
      className="border border-[#282A74] bg-transparent text-[#282A74] text-sm px-6 py-3 rounded-full font-medium"
      {...props}
    >
      {props.children || "Learn more"}
    </button>
  );
};

export const CPbuttonTransparent = ({
  loading = false,
  ...props
}: { loading?: boolean } & ButtonHTMLAttributes<HTMLButtonElement>) => {
  return (
    <button
      disabled={loading}
      className={`font-medium text-sm px-3 py-2 border border-[#E2E8F0] rounded-[5px] flex items-center gap-1
  ${loading ? "bg-[#f1f5f9] text-[#94a3b8]" : "bg-white text-[#020617]"}`}
      {...props}
    >
      {loading && <CPspinnerLoader size={15} />}
      {props.children}
    </button>
  );
};

export default CPbutton;
