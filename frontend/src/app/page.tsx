"use client";

import { useState } from "react";
import { generatePosts } from "../api";
import { ERROR_MESSAGES } from "@/messages/errors";
import { FormInput } from "@/components/FormInput";
import { FormTextArea } from "@/components/FormTextArea";
import { FormNumber } from "@/components/FormNumber";
import Loading from "@/components/Loading";
import { PostCard } from "@/components/PostCard";

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
      const errorCode = err?.code || "SOMETHING_WENT_WRONG";
      setError(ERROR_MESSAGES[errorCode]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleCopyToClipboard = async (text: string, index: number) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedIndex(index);
      setTimeout(() => setCopiedIndex(null), 1500);
      setError(null);
    } catch {
      setError(ERROR_MESSAGES.COPY_FAILED);
    }
  };

  console.log("posts", posts);

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
              <PostCard
                key={index}
                post={post}
                onCopy={() => handleCopyToClipboard(post.content, index)}
                copied={copiedIndex === index}
              />
            ))}
          </div>
        </div>
      )}
    </main>
  );
}
