export interface BlogPost {
  id: string;
  title: string;
  content: string;
  published: string;
  updated: string;
  url: string;
  labels?: string[];
  images?: { url: string }[];
  author: {
    displayName: string;
    image?: { url: string };
  };
}

export interface Subscriber {
  id: string;
  email: string;
  subscribed_at: string;
  is_active: boolean;
  unsubscribe_token: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  techStack: string[];
  githubUrl?: string;
  liveUrl?: string;
  image?: string;
  featured?: boolean;
}

export interface ContactFormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}
