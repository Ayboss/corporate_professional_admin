"use client";

import React, { useEffect, useState } from "react";

import { TReaction } from "@/types/posts";
import CPsharePost from "./CPsharePost";
import LoveIcon from "@/imagecomponents/LoveIcon";
import RetweetIcon from "@/imagecomponents/RetweetIcon";
import CommentIcon from "@/imagecomponents/CommentIcon";

type TCPpostCardFooter = {
  total_comments: number;
  total_reactions: number;
  is_bookmarked: boolean;
  total_reposts: number;
  reactions_breakdown: TReaction;
  is_repost: boolean;
  post_id: string;

  setShowComments: React.Dispatch<React.SetStateAction<boolean>>;
};

function CPpostCardFooter({
  total_comments,
  total_reactions,
  total_reposts,
  is_bookmarked,
  post_id,

  setShowComments = () => {},

  reactions_breakdown,
}: // is_repost
// reactions_breakdown,
// is_repost,

TCPpostCardFooter) {
  const [heart, setHeart] = useState(false);
  const [bookmark, setBookMark] = useState(is_bookmarked);

  const [addLike, setaddLike] = useState(0);

  useEffect(() => {
    const val =
      reactions_breakdown.congratulations?.has_reacted ||
      reactions_breakdown.funny?.has_reacted ||
      reactions_breakdown.insightful?.has_reacted ||
      reactions_breakdown.like?.has_reacted ||
      reactions_breakdown.love?.has_reacted;

    setHeart(val);
  }, [reactions_breakdown]);

  // Repost
  return (
    <div className="flex items-center">
      <div className="flex items-center flex-1 gap-[18]">
        <div className="flex items-center gap-2">
          <LoveIcon active={heart} />

          <span className="text-slate text-xs">
            {total_reactions + addLike}
          </span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={() => setShowComments((s) => !s)}>
            <CommentIcon />
          </button>
          <span className="text-slate text-xs">{total_comments}</span>
        </div>
        <div className="flex items-center gap-2">
          <RetweetIcon />

          <span className="text-slate text-xs">{total_reposts}</span>
        </div>
      </div>
      <div className="flex items-center gap-[18]">
        <div className="relative">
          <CPsharePost
            url={`${window.location.origin}/dashboard/post/${post_id}`}
          />
        </div>
      </div>
    </div>
  );
}

export default CPpostCardFooter;
