
export interface Comment {
  id: string;
  author: string;
  text: string;
  likes: string;
  avatar: string;
  timestamp: string;
}

export interface Creator {
  name: string;
  avatar: string;
  subscribers: string;
  verified: boolean;
}

export interface Video {
  id: string;
  videoId: string; // ID for YT or RuTube
  platform: 'youtube' | 'rutube';
  title: string;
  thumbnail: string;
  creator: Creator;
  views: string;
  postedAt: string;
  duration: string;
  description: string;
  comments: Comment[];
  category: string;
}

export type AppState = {
  currentVideo: Video | null;
  searchQuery: string;
  selectedCategory: string;
};
