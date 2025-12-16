"use client";

import { useState } from "react";
import { generatePosts } from "../api";
import { ERROR_MESSAGES } from "@/messages/errors";
import { FormInput } from "@/components/FormInput";
import { FormTextArea } from "@/components/FormTextArea";
import { FormNumber } from "@/components/FormNumber";
import Loading from "@/components/Loading";

interface Product {
  name: string;
  description: string;
  price: number;
  category?: string;
}

interface SocialMediaPost {
  platform: "twitter" | "instagram" | "linkedin";
  content: string;
}

const PLATFORM_ICONS = {
  twitter: "𝕏",
  instagram: "📷",
  linkedin: "💼",
};

export default function Home() {
  const [error, setError] = useState<string | null>(null);
  const [product, setProduct] = useState<Product>({
    name: "",
    description: "",
    price: 0,
    category: "",
  });
  const [posts, setPosts] = useState<SocialMediaPost[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const handleGeneratePosts = async () => {
    if (isLoading) return;
    setError(null);
    setIsLoading(true);

    try {
      const result = await generatePosts(product);
      setPosts(result.posts);
    } catch (err: any) {
      const errorCode = err?.code || "UNKNOWN_ERROR";
      setError(ERROR_MESSAGES[errorCode] || ERROR_MESSAGES.UNKNOWN_ERROR);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
    } catch {
      // silently fail or show toast in real life
    }
  };

  return (
    <main className="min-h-screen p-8 max-w-4xl mx-auto">
      {isLoading && <Loading />}
      <h1 className="text-3xl font-bold mb-8">Social Media Post Generator</h1>

      {/* TODO: in real life would use toast library, tried not overengineering this */}
      {error && (
        <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-md">
          <p className="text-red-600">{error}</p>
        </div>
      )}

      <div className="space-y-4 mb-8">
        <div>
          <FormInput
            label="Name"
            value={product.name}
            required
            onChange={(value) => setProduct({ ...product, name: value })}
          />
        </div>

        <div>
          <FormTextArea
            label="Description"
            value={product.description}
            required
            onChange={(value) => setProduct({ ...product, description: value })}
          />
        </div>

        <div>
          <FormNumber
            label="Price (€)"
            value={product.price}
            required
            onChange={(value) => setProduct({ ...product, price: value })}
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Category (optional)
          </label>
          <input
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={product.category || ""}
            onChange={(e) =>
              setProduct({ ...product, category: e.target.value })
            }
            placeholder="Health & Wellness"
          />
        </div>
      </div>

      <button
        onClick={handleGeneratePosts}
        className="px-6 py-3 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Generating..." : "Generate Posts"}
      </button>

      {posts.length > 0 && (
        <div className="mt-8">
          <h2 className="text-2xl font-semibold mb-4">Generated Posts</h2>
          <div className="space-y-4">
            {posts.map((post, index) => (
              <div
                key={index}
                className="relative p-4 border rounded-lg hover:shadow-md transition-shadow"
              >
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-2xl">
                    {PLATFORM_ICONS[post.platform]}
                  </span>
                  <span className="font-medium text-sm text-gray-600 capitalize">
                    {post.platform}
                  </span>
                  <span className="text-xs text-gray-400">
                    {post.content.length} chars
                  </span>
                </div>
                <p className="text-gray-800 whitespace-pre-wrap">
                  {post.content}
                </p>
                <button
                  onClick={() => handleCopyToClipboard(post.content, index)}
                  className="absolute bottom-3 right-3 text-xs px-2 py-1 rounded-md
             border bg-white hover:bg-gray-100 text-gray-600 transition"
                >
                  {copiedIndex === index ? "Copied! ✅" : "Copy 📋"}
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
