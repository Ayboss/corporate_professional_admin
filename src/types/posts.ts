import { TUser } from "./users";

export type TPost = {
  title: string;
  content: string;
  post_type: string;
  industry: string;
  visibility: string;
  experience_level: string;
  job_title: string;
  tags: string[];
  skills: string[];
  expires_at: string;
  media_urls: string[];
  media_type: string;
  id: string;
  user: TUser | null;
  username: null;
  is_active: boolean;
  is_liked: boolean;
  created_at: string;
  updated_at: string;
  published_at: string;
  total_comments: number;
  total_reactions: number;
  total_reposts: number;
  is_bookmarked: boolean;
  reactions_breakdown: TReaction;
  is_repost: boolean;
  original_post_id: string;
};

export type TReaction = {
  like: { count: number; has_reacted: boolean };
  love: { count: number; has_reacted: boolean };
  insightful: { count: number; has_reacted: boolean };
  funny: { count: number; has_reacted: boolean };
  congratulations: { count: number; has_reacted: boolean };
};
