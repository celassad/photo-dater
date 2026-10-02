import PhotoImport from "./photo-import";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col font-sans md:flex-row">
      <aside className="flex w-full flex-col gap-8 border-b border-zinc-200 bg-white p-6 md:w-80 md:shrink-0 md:border-r md:border-b-0 dark:border-zinc-800 dark:bg-zinc-950">
        <header className="flex flex-col gap-2">
          <h1 className="text-2xl font-semibold tracking-tight">Photo Dater</h1>
          <p className="text-sm leading-6 text-zinc-600 dark:text-zinc-400">
            Adds the date your photo was taken to the bottom-right corner of the
            image.
          </p>
        </header>
        <PhotoImport />
      </aside>

      <main className="flex-1 bg-zinc-50 dark:bg-black" />
    </div>
  );
}
