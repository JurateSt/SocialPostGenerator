// TODO: in real life would use a library for loading
"use client";

import { useMemo } from "react";

const MESSAGES = [
  "Wait for it… 👉👀👀",
  "Generating magic… ✨",
  "Talking to the AI brain… 🧠",
  "Crafting your posts… ✍️",
  "Almost there… 🚀",
  "Hold on… good things take time 😄",
];

const Loading = () => {
  const message = useMemo(
    () => MESSAGES[Math.floor(Math.random() * MESSAGES.length)],
    []
  );

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30 backdrop-blur-sm">
      <div className="flex flex-col items-center gap-4 rounded-lg bg-white px-6 py-5 shadow-lg">
        {/* spinner */}
        <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />

        {/* message */}
        <p className="text-sm text-gray-600">{message}</p>
      </div>
    </div>
  );
};

export default Loading;
