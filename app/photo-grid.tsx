export type Photo = { file: File; url: string };

// Displays the imported photos in a responsive grid.
export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(16rem,1fr))] gap-6">
      {photos.map((photo) => (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          key={photo.url}
          src={photo.url}
          alt={photo.file.name}
          className="aspect-[3/2] w-full rounded-lg bg-zinc-200 object-contain shadow-sm dark:bg-zinc-800"
        />
      ))}
    </div>
  );
}
