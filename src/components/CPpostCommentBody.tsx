import React from "react";

import useSWR from "swr";

import CPprofileImg from "./CPprofileImg";

import { TComment } from "@/types/posts";
import Skeleton from "react-loading-skeleton";
import { fetchPostComments } from "@/functions/posts";

const CPpostCommentBody = ({ post_id }: { post_id: string }) => {
  const { data, isLoading } = useSWR(
    `/comments/post/${post_id}`,
    fetchPostComments
  );

  return (
    <div className="px-3 mt-4">
      {isLoading ? (
        <Skeleton />
      ) : (
        data?.map((comment) => (
          <CPpostComment key={comment.created_at} comment={comment} />
        ))
      )}
    </div>
  );
};

const CPpostComment = ({ comment }: { comment: TComment }) => {
  return (
    <div className="flex items-start gap-3 mb-3">
      <CPprofileImg
        url={comment.user?.profile_image_url}
        full_name={comment.user?.full_name}
        size={35}
      />
      <div className="flex-1">
        <p className="font-medium text-sm text-slate">
          {comment.user.full_name}
        </p>
        <p className="text-[#64748B] text-sm ">{comment.user.job_title}</p>
        <p className=" text-slate text-sm leading-5  mt-1">{comment.content}</p>
      </div>
    </div>
  );
};

export default CPpostCommentBody;
