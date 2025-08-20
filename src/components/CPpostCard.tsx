"use client";
import React, { useState } from "react";
import CPprofileImg from "./CPprofileImg";
import CPpostCardHeader from "./CPpostCardHeader";
import CPpostCardBody from "./CPpostCardBody";
import CPpostCardFooter from "./CPpostCardFooter";

import CPpostCommentBody from "./CPpostCommentBody";
import Link from "next/link";

import CPpostCardBodyRepost from "./CPpostCardBodyRepost";
import { TPost } from "@/types/posts";

function CPpostCard({
  post,
  showComment = false,
  isLink = false,
}: {
  post: TPost;
  showComment?: boolean;
  isLink?: boolean;
}) {
  const [showComments, setShowComments] = useState(showComment);

  // display different UI for a repost

  const content = (
    <div className=" flex gap-4 items-start mb-3 max-sm:flex-col max-sm:items-stretch">
      <CPprofileImg
        url={post.user?.profile_image_url}
        full_name={post.user?.full_name}
      />
      <div className="flex-1">
        <CPpostCardHeader
          name={post.user?.full_name}
          userid={post.user?.id}
          job_title={post.job_title}
          created_at={post.created_at}
        />
        {post.is_repost ? (
          <CPpostCardBodyRepost post={post} />
        ) : (
          <CPpostCardBody post={post} />
        )}

        <CPpostCardFooter
          total_comments={post.total_comments}
          total_reactions={post.total_reactions}
          is_bookmarked={post.is_bookmarked}
          reactions_breakdown={post.reactions_breakdown}
          setShowComments={setShowComments}
          post_id={post.id}
          is_repost={post.is_repost}
          total_reposts={post.total_comments}
        />
      </div>
    </div>
  );

  return (
    <div className="border-b border-[#E2E8F0] p-6 max-sm:rounded-2xl max-sm:border mb-6 ">
      {isLink ? (
        <Link href={`/dashboard/post/${post.id}`}>{content}</Link>
      ) : (
        <>{content}</>
      )}

      {showComments && <CPpostCommentBody post_id={post.id} />}
    </div>
  );
}

export default CPpostCard;
