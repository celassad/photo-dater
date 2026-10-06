export type Photo = {
  file: File;
  url: string;
  metadata: Record<string, unknown> | undefined;
  width: number;
  height: number;
};

const ROW_HEIGHT = 192;

// Displays the imported photos in justified rows: every photo in a row has the
// same height, and widths follow each photo's ratio so rows fill the full width.
export default function PhotoGrid({ photos }: { photos: Photo[] }) {
  return (
    // The ::after element absorbs the last row's leftover space, so its photos don't stretch.
    <div className="flex flex-wrap gap-4 after:grow-[999999] after:content-['']">
      {photos.map((photo) => {
        const ratio = photo.width / photo.height;
        return (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            key={photo.url}
            src={photo.url}
            alt={photo.file.name}
            style={{
              flexGrow: ratio,
              flexBasis: ratio * ROW_HEIGHT,
              aspectRatio: ratio,
            }}
            className="min-w-0 rounded-lg shadow-sm"
          />
        );
      })}
    </div>
  );
}
