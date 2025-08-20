"use client";

import { TPost } from "@/types/posts";
import CPpostCardHeader from "./CPpostCardHeader";
import Link from "next/link";

function CPpostCardBodyRepost({ post }: { post: TPost }) {
  return (
    <>
      <div className="mb-[36px] mt-2">
        {post.title && (
          <h1 className="text-slate-900 text-[20px] mb-3 font-medium">
            {post.title}
          </h1>
        )}
        {post.content && (
          <p className="text-slate-700 text-sm leading-5">{post.content}</p>
        )}

        <Link href={`/posts/${post.original_post_id}`}>
          <div className="border border-[#8c979f] p-2 rounded mt-2">
            <CPpostCardHeader
              name={post.original_post_info?.user?.full_name}
              userid={post.original_post_info.user?.id}
              job_title={post.original_post_info.user?.job_title}
            />

            <h1 className="text-slate-900 text-[20px] mb-3 font-medium">
              {post.original_post_info.title}
            </h1>
            {post.original_post_info.content && (
              <p className="text-slate-700 text-sm leading-5">
                {post.original_post_info.content}
              </p>
            )}
          </div>
        </Link>
      </div>
    </>
  );
}

export default CPpostCardBodyRepost;
