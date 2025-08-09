import { TPost } from "./posts";

export type TUser = {
  full_name: string;
  email: string;
  phone: string;
  company: string | undefined;
  job_title: string | undefined;
  bio: string;
  status: string | undefined;
  industry: string;
  years_of_experience: string;
  location: string;
  visibility: string;
  topics: string[];
  recruiter_tag: boolean;
  id: string;
  age: string | undefined;
  work_experience: TWorkExperience[];
  education: TEducation[];
  contact: TContact[];
  skills: TSkill[];
  linkedin_profile: string;
  sections: {
    full_name: TSection;
    email: TSection;
    industry: TSection;
    location: TSection;
    working_experinece: TSection;
    job_title: TSection;
    skills: TSection;
    education: TSection;
    years_of_experience: TSection;
    certifications: TSection;
    bio: TSection;
  };
  missing_fields: string[];
  profile_completion: number;
  created_at: string;
  is_active: boolean;
  is_verified: boolean;
  is_admin: boolean;
  updated_at: string;
  sex: string | undefined;
  profile_image_url: string;
  cv_url: null;
};

export type TFullUserDetails = {
  user: TUser;
  activity_summary: {
    account_age_days: number;
    is_suspended: boolean;
    last_login: null;
    login_frequency: number;
    total_connections: number;
    total_posts: number;
    warning_count: number;
  };
  recent_activities: {
    date: null | Date;
    description: string;
    type: string;
  };
};

export type TSection = {
  completed: boolean;
  weight: number;
};

export type TContact = {
  id: string;
  type: string;
  platform_name: string;
  username: string;
  url: string;
  created_at: string;
};

export type TWorkExperience = {
  title: string;
  company: string;
  company_url: string;
  location: string;
  employment_type: string;
  start_date: string;
  end_date: string;
  currently_working: boolean;
  description: string;
  achievements: string;
  id: string;
  created_at: string;
};

export type TVolunteering = {
  role: string;
  organization: string;
  organization_url: string;
  location: string;
  start_date: string;
  end_date: string;
  currently_volunteering: boolean;
  description: string;
  id: string;
  created_at: string;
};

export type TEducation = {
  degree: string;
  school: string;
  location: string;
  url: string;
  description: string;
  media_url: string;
  from_date: string;
  to_date: string;
  id: string;
  created_at: string;
};

export type TSkill = {
  id: number;
  name: string;
};

export type TMetrics = {
  total_users: number;
  active_users: number;
  new_users_24h: number;
  recruiters: number;
  total_posts: number;
  active_posts: number;
  profile_completion_rate: number;
  recent_signups: TUser[];
  recent_posts: TPost[];
};
