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
    signup_trend: [
      {
        date: Date;
        value: number;
        percentage_change: number;
      }
    ];
    dau_trend: [
      {
        date: Date;
        value: number;
        percentage_change: number;
      }
    ];
    most_connected_users: [];
    most_active_posters: [];
    most_engaged_users: [];
    signup_sources: {
      additionalProp1: number;
      additionalProp2: number;
      additionalProp3: number;
    };
    login_frequency: {
      additionalProp1: number;
      additionalProp2: number;
      additionalProp3: number;
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
    most_viral_posts: [];
    most_commented_posts: [];
    most_shared_posts: [];
    average_engagement_rate: 0;
    average_virality_score: 0;
    career_advice_posts: 0;
    job_posts: 0;
    company_updates: 0;
    engagement_by_post_type: {
      additionalProp1: additionalProp;
      additionalProp2: additionalProp;
      additionalProp3: additionalProp;
    };
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
    profile_completion_rate: 0;
    profile_picture_upload_rate: 0;
    connection_request_rate: 0;
    activation_funnel: {
      additionalProp1: null;
      additionalProp2: null;
      additionalProp3: null;
    };
    avg_time_to_profile_completion: 0;
    avg_time_to_first_connection: 0;
    avg_time_to_first_post: 0;
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
  most_connected_users: [];
  most_active_posters: [];
  most_engaged_users: [];
  signup_sources: additionalProp;
  login_frequency: additionalProp;
};

export type TcontentAnalytics = {
  post_type_distribution: additionalProp;
  most_viral_posts: [];
  most_commented_posts: [];
  most_shared_posts: [];
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

export type TcohortAnalytics = {
  cohort_data: [];
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

type percentType = {
  date: Date;
  value: number;
  percentage_change: number;
};
type additionalProp = {
  additionalProp1: number;
  additionalProp2: number;
  additionalProp3: number;
};
