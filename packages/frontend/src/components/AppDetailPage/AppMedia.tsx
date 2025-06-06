import React from "react";

const AppMedia: React.FC<{ project: any }> = ({ project }) => {
  const images =
    project.media?.length > 0
      ? project.media
      : [
          {
            url: "https://placehold.co/600x400/2d3748/e2e8f0?text=App+Screenshot+1",
            alt: "App Screenshot 1",
          },
          {
            url: "https://placehold.co/600x400/2d3748/e2e8f0?text=Hardware+Setup",
            alt: "Hardware Setup",
          },
        ];
  return (
    <section className="bg-gray-800 p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-semibold text-slate-100 mb-4">
        Screenshots & Media
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {images.map((img: any, i: number) => (
          <img
            key={i}
            src={img.url}
            alt={img.alt || `Screenshot ${i + 1}`}
            className="rounded-md shadow-md w-full h-auto object-cover aspect-video"
          />
        ))}
      </div>
    </section>
  );
};

export default AppMedia;
