export type Platform = "twitter" | "instagram" | "linkedin";

export interface SocialMediaPost {
  platform: Platform;
  content: string;
}
