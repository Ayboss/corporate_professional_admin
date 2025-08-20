"use client";
import CPtableListWorkExp from "@/components/CPtableListWorkExp";
import {
  activateUser,
  deactivateUser,
  downloadUserCv,
  getUserProfile,
} from "@/functions/users";
import { TUser } from "@/types/users";
import { errorMessage, successMessage } from "@/utils/toastalert";
import { useParams } from "next/navigation";
import React from "react";
import useSWR from "swr";
import dayjs from "dayjs";
import useSWRMutation from "swr/mutation";
import { DownloadIcon } from "lucide-react";
import CPspinnerLoader from "@/components/CPspinnerLoader";
import CPprofileImg from "@/components/CPprofileImg";
import CPbutton from "@/components/CPbutton";
import { Skeleton } from "@radix-ui/themes";
import { makeUserAModerator } from "@/functions/moderators";

function UserDetails() {
  const params = useParams();
  const userId = params?.userId as string;
  const { data, isLoading } = useSWR(
    `/admin/users/${userId}/details`,
    getUserProfile
  );
  const { trigger: handleDeactivate, isMutating: isLoadingDeactive } =
    useSWRMutation(`/admin/users/${userId}/deactivate`, deactivateUser);
  const { trigger: handleActivate, isMutating: isLoadingActive } =
    useSWRMutation(`/admin/users/${userId}/activate`, activateUser);
  const user = data?.user;
  const { trigger: makeModerator, isMutating: loadingModerator } =
    useSWRMutation("/admin/moderators/", makeUserAModerator);
  // const { trigger: removeModerator } = useSWRMutation(
  //   "/admin/moderators/",
  //   removeAModerator
  // );
  const handleActivateDeactivate = () => {
    if (!user) return;
    if (user.is_active) {
      handleDeactivate({ user_id: user?.id });
    } else {
      handleActivate({ user_id: user?.id });
    }
  };
  const handleMake = async () => {
    const id = userId.trim();
    if (!id) return;

    await makeModerator({ user_id: id });
  };
  const handleExportUser = () => {};
  if (isLoading || !user) {
    return <Skeleton loading={isLoading} />;
  }
  return (
    <div>
      <div className="p-6">
        <div className="mb-10">
          <CPprofileCard user={user} />
        </div>
        <div>
          <p className="mb-2">Actions</p>
          <div className="flex items-center gap-3 flex-wrap">
            <CPbutton
              onClick={handleActivateDeactivate}
              loading={isLoadingDeactive || isLoadingActive}
            >
              {user.is_active ? "Deactive" : "Activate"}
            </CPbutton>
            <CPbutton
              onClick={handleExportUser}
              loading={isLoadingDeactive || isLoadingActive}
            >
              Export
            </CPbutton>
            <CPbutton onClick={handleMake} loading={loadingModerator}>
              Make Moderator
            </CPbutton>
          </div>
        </div>
        <div className="mb-12">
          <h5 className="text-[#050505] mb-2">About</h5>
          <p className="text-[#64748B] text-sm">{user?.bio}</p>
        </div>
        <div className="mb-12">
          <h5 className="text-[#050505] mb-2">Contact</h5>

          <div className="flex flex-col gap-2">
            {user.contact.map((item) => (
              <CPtableList
                key={item.id}
                left={item.platform_name}
                right={item.username}
              />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <h5 className="text-[#050505] mb-5">Professional Details</h5>
          <div className="flex flex-col gap-2">
            <CPtableList left="Industry" right={user.industry} />
            <CPtableList left="Experience" right={user.years_of_experience} />
          </div>
        </div>
        <div className="mb-12">
          <div className="mb-5 flex justify-between">
            <h5 className="text-[#050505] ">
              Work Experience
              {/* <span className="text-primary text-xs">~ From Cv</span> */}
            </h5>

            {/* <button>Edit</button> */}
          </div>
          <div className="flex flex-col gap-6">
            {data.work_experiences.map((exp) => (
              <CPtableListWorkExp
                key={exp.id}
                left={`${dayjs(exp.start_date).format("DD MMM YYYY")} - ${dayjs(
                  exp.end_date
                ).format("DD MMM YYYY")}`}
                title={exp.title}
                location={exp.location}
                list={[exp.description]}
              />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <div className="mb-5 flex justify-between">
            <h5 className="text-[#050505] ">Education</h5>
          </div>
          <div className="flex flex-col gap-6">
            {data.education.map((exp) => (
              <CPtableListWorkExp
                key={exp.id}
                left={`${dayjs(exp.from_date).format("DD MMM YYYY")} - ${dayjs(
                  exp.to_date
                ).format("DD MMM YYYY")}`}
                title={exp.school}
                location={exp.location}
                list={[exp.description]}
              />
            ))}
          </div>
        </div>
        <div className="mb-12">
          <h5 className="text-[#050505] mb-5">Profile Preferences</h5>
          <div className="flex flex-col gap-2">
            <CPtableList left="Visibility" right={user.visibility} />
            <CPtableList
              left="Status"
              right={user.recruiter_tag ? "Recruiter" : "Talent"}
            />
          </div>
        </div>
        <div className="mb-12">
          <h5 className="text-[#050505] mb-5">Recent Activities</h5>
          <div className="flex flex-col gap-2">
            {data.recent_activities.map((act, i) => (
              <div key={i} className="flex gap-1.5 items-center">
                <div className="mb-1 text-gray-400">
                  {dayjs(act.date).format("DD MMM YYYY")} {act.type}
                </div>
                <div>{act.description}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

const CPprofileCard = ({ user }: { user: TUser }) => {
  const { trigger, isMutating } = useSWRMutation(
    `/profiles/${user.id}/cv`,
    downloadUserCv
  );
  const ondownloadCv = async () => {
    try {
      const response = await trigger();

      const link = document.createElement("a");
      link.href = response.download_url;
      link.setAttribute("download", "cv.pdf");
      link.setAttribute("target", "_blank");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);

      successMessage("CV retrieved");
    } catch (err) {
      errorMessage(err, "User’s CV not available for download");
    }
  };
  return (
    <div className="flex gap-5 items-center ">
      <CPprofileImg full_name={user?.full_name} url={user?.profile_image_url} />
      <div className="flex-1">
        <p className="flex gap-3 items-center">
          <span className="text-[#050505] ">{user?.full_name}</span>
          <span className="text-primary font-medium py-1 px-2 bg-[#F8FAFC] rounded-full">
            {/* {user.recruiter_tag ? "Recruiter" : "Talent"} */}
          </span>
        </p>
        {/* <p className="text-[#64748B] text-sm">{user.job_title}</p> */}
      </div>
      <div className="flex gap-2 items-center">
        <button onClick={ondownloadCv} disabled={isMutating}>
          {isMutating ? <CPspinnerLoader size={10} /> : <DownloadIcon />}
        </button>
      </div>
    </div>
  );
};

const CPtableList = ({ left, right }: { left: string; right: string }) => {
  return (
    <div className=" flex gap-2">
      <p className="w-[180] text-[#64748B] text-sm">{left}</p>
      <p className="flex-1 text-slate text-sm">{right}</p>
    </div>
  );
};
export default UserDetails;
