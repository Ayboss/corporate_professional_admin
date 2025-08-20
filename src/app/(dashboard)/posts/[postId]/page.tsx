"use client";
import React, { useState } from "react";

import useSWR from "swr";
import { useParams } from "next/navigation"; // for App Router (Next.js 13+)
import Skeleton from "react-loading-skeleton";
import CPpostCard from "@/components/CPpostCard";
import {
  deletePost,
  getUserPost,
  updatePostVisibility,
} from "@/functions/posts";
import CPbutton from "@/components/CPbutton";
import useSWRMutation from "swr/mutation";
import CPModal from "@/components/CPModal";

function PostDetails() {
  const params = useParams();
  const postId = params?.postId as string;
  const [deletemodal, setDeleteModal] = useState(false);
  const { data, isLoading, mutate } = useSWR(`/posts/${postId}`, getUserPost);
  const { trigger: updateVisibility, isMutating: loadingVisisbility } =
    useSWRMutation(`/admin/posts/${data?.id}/visibility`, updatePostVisibility);
  const { trigger: deletePostTrigger, isMutating: loadingDeletepost } =
    useSWRMutation(`/admin/posts/${data?.id}`, deletePost);
  if (isLoading || !data) {
    return (
      <div>
        <PostSkeleton />
      </div>
    );
  }

  return (
    <div>
      <div className="flex gap-2">
        <CPbutton
          onClick={() => {
            const visibility =
              data.visibility == "public" ? "private" : "public";
            updateVisibility({ post_id: data.id, visibility }).then(() => {
              mutate({ ...data, visibility: visibility }); // Revalidate the post data after updating visibility
            });
          }}
          loading={loadingVisisbility}
        >
          {data.visibility == "public"
            ? "make post private"
            : "make post public"}
        </CPbutton>
        <CPbutton className="bg-red-400" onClick={() => setDeleteModal(true)}>
          Delete post
        </CPbutton>
      </div>
      <div className="p-6">
        <CPpostCard post={data} showComment={true} />
      </div>
      {deletemodal && (
        <CPModal
          width={400}
          backgroundAction={() => setDeleteModal(false)}
          height={400}
        >
          <div className="p-6 mt-10">
            <h1 className="text-lg font-semibold mb-4">
              Are you sure you want to delete this post?
            </h1>
            <CPbutton
              className="bg-red-400"
              onClick={() => deletePostTrigger({ post_id: data.id })}
              loading={loadingDeletepost}
            >
              Delete post
            </CPbutton>
          </div>
        </CPModal>
      )}
    </div>
  );
}

const PostSkeleton = () => {
  return (
    <div>
      <Skeleton />
    </div>
  );
};

export default PostDetails;
