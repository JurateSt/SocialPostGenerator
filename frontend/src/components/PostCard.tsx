const PLATFORM_STYLES = {
  Twitter: "border-sky-400 bg-sky-50 text-sky-900 ring-1 ring-sky-100",
  Instagram:
    "border-pink-400 bg-gradient-to-br from-pink-50 via-purple-50 to-orange-50 text-gray-900 ring-1 ring-pink-100",
  LinkedIn: "border-blue-500 bg-blue-50 text-blue-900 ring-1 ring-blue-100",
} as const;

interface SocialMediaPost {
  platform: "twitter" | "instagram" | "linkedin";
  content: string;
}

const PLATFORM_ICONS = {
  twitter: "𝕏",
  instagram: "📷",
  linkedin: "💼",
};

interface PostCardProps {
  post: SocialMediaPost;
  onCopy: () => void;
  copied: boolean;
}

export const PostCard = ({ post, onCopy, copied }: PostCardProps) => {
  return (
    <div
      className={`relative p-4 border rounded-lg transition-shadow hover:shadow-md
  ${PLATFORM_STYLES[post.platform]}`}
    >
      <div className="flex items-center gap-2 mb-2">
        <span className="text-2xl">{PLATFORM_ICONS[post.platform]}</span>
        <span className="font-medium text-sm text-gray-600 capitalize">
          {post.platform}
        </span>
        <span className="text-xs text-gray-400">
          {post.content.length} chars
        </span>
      </div>

      <p className="text-gray-800 whitespace-pre-wrap">{post.content}</p>

      <button
        onClick={onCopy}
        className="absolute bottom-3 right-3 text-xs px-2 py-1 rounded-md
			border bg-white hover:bg-gray-100 text-gray-600 transition"
      >
        {copied ? "Copied! ✅" : "Copy 📋"}
      </button>
    </div>
  );
};
