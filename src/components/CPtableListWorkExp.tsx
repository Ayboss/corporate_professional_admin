import { LinkIcon } from "@/imagecomponents";
import React from "react";

function CPtableListWorkExp({
  left,
  title,
  location,
  list,
  link,
  onDelete = null,
  onEdit = null,
}: {
  left?: string;
  title?: string;
  location?: string;
  list?: string[];
  link?: string;
  onDelete?: (() => void) | null;
  onEdit?: (() => void) | null;
}) {
  return (
    <div className="flex gap-2 mb-10 max-sm:flex-col">
      <p className="w-[180] text-[#64748B] text-sm">{left}</p>
      <div className="flex-1">
        <h6 className="text-slate text-sm mb-2 flex items-center gap-1">
          <span>{title}</span>
          {link && (
            <a href={link} target="_blank">
              <LinkIcon />
            </a>
          )}
        </h6>
        <p className="text-[#64748B] text-xs mb-3.5">{location}</p>

        <ul className="list-disc">
          {list?.map((item, i) => {
            return (
              <li key={i} className="text-[#64748B] text-sm mb-3">
                {item}
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-3">
          {onDelete && (
            <button
              className="text-xs text-[#64748B] cursor-pointer"
              onClick={onDelete}
            >
              Delete
            </button>
          )}
          {onEdit && (
            <button
              className="text-xs text-[#64748B] cursor-pointer"
              onClick={onEdit}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CPtableListWorkExp;
