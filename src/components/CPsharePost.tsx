"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  WhatsappShareButton,
  TwitterShareButton,
  LinkedinShareButton,
  WhatsappIcon,
  TwitterIcon,
  LinkedinIcon,
} from "react-share";

import CopyIcon from "@/imagecomponents/CopyIcon";
import ShareIcon from "@/imagecomponents/ShareIcon";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";

function CPsharePost({ url }: { url: string }) {
  const [showShareOptions, setShowShareOptions] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const copyTextToClipboard = useCopyToClipboard();

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setShowShareOptions(false);
      }
    }

    if (showShareOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showShareOptions]);

  return (
    <div className="relative leading-0" ref={dropdownRef}>
      <button onClick={() => setShowShareOptions((s) => !s)}>
        <ShareIcon />
      </button>

      {showShareOptions && (
        <div className="absolute right-0 mt-2 bg-white border rounded shadow-lg p-3 z-10 flex gap-2">
          <TwitterShareButton url={url} title={"Check out this post!"}>
            <TwitterIcon size={32} round />
          </TwitterShareButton>
          <LinkedinShareButton url={url}>
            <LinkedinIcon size={32} round />
          </LinkedinShareButton>
          <WhatsappShareButton url={url} title={"Check out this post!"}>
            <WhatsappIcon size={32} round />
          </WhatsappShareButton>
          <button
            className="cursor-pointer"
            onClick={() => {
              copyTextToClipboard(url);
            }}
          >
            <CopyIcon />
          </button>
        </div>
      )}
    </div>
  );
}

export default CPsharePost;
