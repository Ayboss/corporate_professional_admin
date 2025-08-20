import { TUser } from "./users";

export type TPostAndAnalytics = {
  post: TPost;
  analytics: {
    engagement_rate: number;
    total_bookmarks: number;
    total_comments: number;
    total_likes: number;
    virality_score: number;
  };
};
export type TPost = {
  title: string;
  content: string;
  post_type: string;
  industry: string;
  visibility: "public" | "private";
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
  original_post_info: {
    content: string;
    title: string;
    id: string;
    user: {
      id: string;
      full_name: string;
      job_title: string;
    };
  };
};

export type TReaction = {
  like: { count: number; has_reacted: boolean };
  love: { count: number; has_reacted: boolean };
  insightful: { count: number; has_reacted: boolean };
  funny: { count: number; has_reacted: boolean };
  congratulations: { count: number; has_reacted: boolean };
};

export type TComment = {
  id: string;
  content: string;
  user_id: string;
  post_id: string;
  created_at: string;
  user: {
    id: string;
    full_name: string;
    job_title: string;
    profile_image_url: string;
  };
};
