"use client";

import { useState } from "react";

// Lets the user pick images from their computer and shows how many were added.
export default function PhotoImport({
  photoCount,
  onPhotosAdd,
}: {
  photoCount: number;
  onPhotosAdd: (photos: File[]) => void;
}) {
  const [error, setError] = useState<string | null>(null);

  function selectFiles(files: File[]) {
    const images = files.filter((file) => file.type.startsWith("image/"));
    setError(
      images.length < files.length
        ? "Files that aren't images were skipped."
        : null,
    );
    if (images.length > 0) onPhotosAdd(images);
  }

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">Photos</h2>

      <label className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-zinc-300 px-4 py-8 text-center text-sm font-medium transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:bg-zinc-900">
        Add photos
        <input
          type="file"
          accept="image/*"
          multiple
          className="hidden"
          onChange={(e) => {
            selectFiles(Array.from(e.target.files ?? []));
            // Reset so choosing the same files again still triggers a change.
            e.target.value = "";
          }}
        />
      </label>

      {photoCount > 0 && (
        <p className="text-sm text-zinc-600 dark:text-zinc-400">
          {photoCount} {photoCount === 1 ? "photo" : "photos"} added
        </p>
      )}
      {error && (
        <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
      )}
    </section>
  );
}
