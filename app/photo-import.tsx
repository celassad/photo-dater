"use client";

import { useState } from "react";

// Lets the user pick an image from their computer and shows the chosen file's name.
export default function PhotoImport() {
  const [photo, setPhoto] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  function selectFile(file: File | undefined) {
    if (!file) return;
    if (!file.type.startsWith("image/")) {
      setError("The imported file isn't an image.");
      return;
    }
    setError(null);
    setPhoto(file);
  }

  return (
    <section className="flex flex-col gap-3">
      <h2 className="text-sm font-medium">Photo</h2>

      <label className="flex cursor-pointer flex-col items-center gap-3 rounded-xl border-2 border-dashed border-zinc-300 px-4 py-8 text-center text-sm font-medium transition-colors hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-700 dark:hover:border-zinc-500 dark:hover:bg-zinc-900">
        {photo ? "Choose another photo" : "Import a photo"}
        <input
          type="file"
          accept="image/*"
          className="hidden"
          onChange={(e) => selectFile(e.target.files?.[0])}
        />
      </label>

      {photo && (
        <p className="truncate text-sm text-zinc-600 dark:text-zinc-400">
          Imported: <span className="font-medium text-foreground">{photo.name}</span>
        </p>
      )}
      {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
    </section>
  );
}
