export type TjobMetric = {
  total_job_postings: number;
  active_job_postings: number;
  average_applications_per_job: number;
  top_job_categories: [];
  job_posting_trends: {
    additionalProp1: string[];
    additionalProp2: string[];
    additionalProp3: string[];
  };
  application_conversion_rate: number;
  time_to_fill: number;
  generated_at: Date;
};

export type TanalyticDashboard = {
  user_metrics: {
    total_users: number;
    new_signups: number;
    daily_active_users: number;
    weekly_active_users: number;
    monthly_active_users: number;
    signup_trend: {
      date: Date;
      value: number;
      percentage_change: number;
    }[];
    dau_trend: {
      date: Date;
      value: number;
      percentage_change: number;
    }[];
    most_connected_users: {
      user_id: string;
      full_name: string;
      connection_count: number;
    }[];
    most_active_posters: {
      user_id: string;
      full_name: string;
      post_count: number;
    }[];
    most_engaged_users: {
      user_id: string;
      full_name: string;
    }[];
    signup_sources: {
      web: number;
    };
    login_frequency: {
      daily: number;
      weekly: number;
      monthly: number;
      occasional: number;
    };
  };
  engagement_metrics: {
    total_posts: number;
    total_comments: number;
    total_likes: number;
    total_messages: number;
    total_connections: number;
    posts_trend: percentType[];
    comments_trend: {
      date: Date;
      value: number;
      percentage_change: number;
    }[];
    likes_trend: {
      date: Date;
      value: number;
      percentage_change: number;
    }[];
    average_session_duration: number;
    repeat_visit_rates: additionalProp;
    avg_time_per_session: number;
    session_duration_distribution: additionalProp;
  };
  content_analytics: {
    post_type_distribution: additionalProp;
    most_viral_posts: TpostContent[];
    most_commented_posts: {
      post_id: string;
      title: null | string;
      content: string;
      comment_count: number;
    }[];
    most_shared_posts: {
      post_id: string;
      title: null | string;
      content: string;
      comment_count: number;
    }[];
    average_engagement_rate: number;
    average_virality_score: number;
    career_advice_posts: number;
    job_posts: number;
    company_updates: number;
    engagement_by_post_type: { [key: string]: additionalProp };
  };
  growth_heatmap: {
    geographic_usage: {
      additionalProp1: null;
      additionalProp2: null;
      additionalProp3: null;
    };
    industry_usage: {
      additionalProp1: null;
      additionalProp2: null;
      additionalProp3: null;
    };
    fastest_growing_countries: [null];
    fastest_growing_industries: [null];
    usage_by_timezone: additionalProp;
    peak_usage_hours: [0];
  };
  activation_metrics: {
    profile_completion_rate: number;
    profile_picture_upload_rate: number;
    connection_request_rate: number;
    activation_funnel: {
      additionalProp1: null;
      additionalProp2: null;
      additionalProp3: null;
    };
    avg_time_to_profile_completion: number;
    avg_time_to_first_connection: number;
    avg_time_to_first_post: number;
    activation_by_industry: additionalProp;
    activation_by_signup_source: additionalProp;
  };
  key_insights: string[];
  recommendations: string[];
  generated_at: Date;
  time_range: string;
  data_freshness: Date;
};
export type TuserMetric = {
  total_users: number;
  new_signups: number;
  daily_active_users: number;
  weekly_active_users: number;
  monthly_active_users: number;
  signup_trend: percentType[];
  dau_trend: percentType[];
  most_connected_users: userType[];
  most_active_posters: userType[];
  most_engaged_users: userType[];
  signup_sources: additionalProp;
  login_frequency: additionalProp;
};

export type TengagementMetric = {
  total_posts: number;
  total_comments: number;
  total_likes: number;
  total_messages: number;
  total_connections: number;
  posts_trend: percentType[];
  comments_trend: percentType[];
  likes_trend: percentType[];
  average_session_duration: number;
  repeat_visit_rates: additionalProp;
  avg_time_per_session: 0;
  session_duration_distribution: additionalProp;
};
export type TcontentAnalytics = {
  post_type_distribution: additionalProp;
  most_viral_posts: TpostContent[];
  most_commented_posts: {
    post_id: string;
    title: null | string;
    content: string;
    comment_count: number;
  }[];
  most_shared_posts: TpostContent[];
  average_engagement_rate: number;
  average_virality_score: number;
  career_advice_posts: number;
  job_posts: number;
  company_updates: number;
  engagement_by_post_type: {
    additionalProp1: additionalProp;
    additionalProp2: additionalProp;
    additionalProp3: additionalProp;
  };
};

export type TanalyticPost = {
  viral_posts: {
    post_id: string;
    title: string;
    content: string;
    author_name: string;
    created_at: string;
    likes_count: number;
    comments_count: number;
    shares_count: number;
    viral_score: number;
    engagement_rate: number;
  }[];
  total_count: number;
  time_range: {
    start_date: string;
    end_date: string;
  };
  generated_at: string;
};

export type TactionMetric = {
  profile_completion_rate: number;
  profile_picture_upload_rate: number;
  connection_request_rate: number;
  activation_funnel: additionalProp;
  avg_time_to_profile_completion: 0;
  avg_time_to_first_connection: 0;
  avg_time_to_first_post: 0;
  activation_by_industry: additionalProp;
  activation_by_signup_source: additionalProp;
};

export type TpostContent = {
  post_id: string;
  title: string;
  content: string;
  author_name: string;
  created_at: string;
  likes_count: number;
  comments_count: number;
  shares_count: number;
  viral_score: number;
  engagement_rate: number;
};
export type TcohortAnalytics = {
  cohort_data: {
    cohort_month: "2025-08-01";
    periods: [
      {
        period: 0;
        retention_rate: 0;
        active_users: 0;
        users_in_cohort: 25;
      },
      {
        period: 0;
        retention_rate: 0;
        active_users: 0;
        users_in_cohort: 25;
      },
      {
        period: 0;
        retention_rate: 0;
        active_users: 0;
        users_in_cohort: 25;
      }
    ];
  }[];
  retention_rates: {
    additionalProp1: number[];
    additionalProp2: number[];
    additionalProp3: number[];
  };
  average_retention_rate: number;
  best_performing_cohort: null;
  worst_performing_cohort: null;
  cohort_insights: string[];
};

type userType = {
  user_id: string;
  full_name: string;
  connection_count: number;
};
type percentType = {
  date: Date;
  value: number;
  percentage_change: number;
};
type additionalProp = Record<string, string>;

export type TcustomReport = {
  report_id: string;
  name: string;
  generated_at: string;
  data: null;
  summary: null;
  export_format: string;
  download_url: string;
};
