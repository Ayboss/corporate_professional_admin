// import MoreIcon from "@/imagecomponents/MoreIcon";
import React from "react";
import dayjs from "@/lib/dayjs";
import Link from "next/link";
function CPpostCardHeader({
  name,
  job_title,
  created_at,
  userid = "",
}: {
  name?: string;
  job_title?: string;
  created_at?: string;
  userid: string | undefined;
}) {
  return (
    <div className="flex justify-between mb-4">
      <div>
        <p className="font-medium text-sm text-slate">
          <Link href={`/dashboard/user/${userid}`}>{name}</Link>
          <span className="text-xs text-[#94A3B8] font-normal">
            • Following
          </span>
        </p>
        <p className="text-[#64748B] text-sm ">{job_title}</p>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-[#64748B] text-xs">
          {dayjs(created_at).fromNow()}
        </span>
        {/* <MoreIcon /> */}
      </div>
    </div>
  );
}

export default CPpostCardHeader;
