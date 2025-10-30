interface Author {
  email: string;
  name: string;
}

export interface IBlog {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  title: string;
  content: string;
  published: boolean;
  views: number;
  coverImage?: string | null;

  // Relation
  authorId: string;
  author: Author;
}
// export interface IBlog {
//   id: string;
//   createdAt: string; // ISO date string
//   updatedAt: string; // ISO date string
//   title: string;
//   content: string;
//   published: boolean;
//   coverImage: String
//   authorId: string;
//   author: Author;
// }
export interface IProject {
  id: string;
  title: string;
  thumbnail: string;
  projectLink?: string;
  liveSite?: string;
  description: string;
  features: string[];
  createdAt: Date;
  updatedAt: Date;
  ownerId: string;
  owner?: IUser | null;
}
export interface IUser {
  name: string;
  email: string;
}

export interface SocialLinks {
  fb_link: string;
  github_link: string;
  linkedin_link: string;
  twitter_link: string;
}

export interface Buttons {
  button_left_title: string;
  button_right_title: string;
}

export interface AboutProps {
  bio_title: string;
  section_title: string;
  bio_content: string;
  social_link: SocialLinks;
  buttons: Buttons;
}
