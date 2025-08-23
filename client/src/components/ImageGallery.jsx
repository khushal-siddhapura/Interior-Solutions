export default function ImageGallery({ images }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {images.map((img, index) => (
        <div
          key={index}
          className="overflow-hidden rounded-2xl shadow-md hover:shadow-lg transition bg-white"
        >
          <img
            src={img.src}
            alt={img.caption || `Gallery ${index}`}
            className="w-full h-96 object-cover transition-transform duration-500 hover:scale-105"
            loading="lazy"
          />
          {img.caption && (
            <div className="p-4">
              <p className="text-gray-700 font-medium text-sm md:text-base leading-snug">
                {img.caption}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
