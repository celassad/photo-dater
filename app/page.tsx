"use client";

import exifr from "exifr";
import { useState } from "react";
import PhotoGrid, { type Photo } from "./photo-grid";
import PhotoImport from "./photo-import";

// Reads the photo's displayed size (EXIF orientation applied)
async function readSize(file: File) {
  const bitmap = await createImageBitmap(file);
  const size = { width: bitmap.width, height: bitmap.height };
  bitmap.close();
  return size;
}

export default function Home() {
  const [photos, setPhotos] = useState<Photo[]>([]);

  async function addPhotos(files: File[]) {
    const added = await Promise.all(
      files.map(async (file) => ({
        file,
        url: URL.createObjectURL(file),
        // Undefined when the photo has no EXIF data or its format isn't supported.
        metadata: await exifr.parse(file).catch(() => undefined),
        ...(await readSize(file)),
      })),
    );
    console.log("added", added);
    setPhotos((current) => [...current, ...added]);
  }

  return (
    <div className="flex flex-1 flex-col font-sans md:flex-row">
      <aside className="flex w-full flex-col gap-8 border-b border-zinc-200 bg-white p-6 md:w-80 md:shrink-0 md:border-r md:border-b-0 dark:border-zinc-800 dark:bg-zinc-950">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Photo Dater</h1>
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Make your photos ready to print. Automatically add the date of your
            photo to the image.
          </p>
        </header>
        <PhotoImport photoCount={photos.length} onPhotosAdd={addPhotos} />
      </aside>

      <main className="flex-1 bg-zinc-50 p-6 dark:bg-black">
        <PhotoGrid photos={photos} />
      </main>
    </div>
  );
}
