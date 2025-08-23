import React from "react";

export default function Card({
  image,
  title,
  description,
  useBackground = false,
  backgroundClass = "",
}) {
  return (
    <div
      className={`group rounded-2xl shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl ${
        useBackground ? `relative ${backgroundClass}` : "bg-white flex flex-col"
      }`}
    >
      {/* --- Standard Card with Image on Top --- */}
      {!useBackground && image && (
        <div className="overflow-hidden aspect-[4/3]">
          {/* This container maintains a 4:3 aspect ratio. 
            The image inside will fill this container without being distorted.
          */}
          <img
            src={image}
            alt={title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        </div>
      )}

      {/* --- Card with Background Image --- */}
      {useBackground && image && (
        <>
          <div
            className="absolute inset-0 bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
            loading="lazy"
          />
          <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition-colors" />
        </>
      )}

      {/* --- Card Content --- */}
      <div
        className={`p-6 text-center ${
          useBackground
            ? "relative z-10 flex flex-col justify-center items-center h-80 text-white"
            : "flex flex-col flex-grow"
        }`}
      >
        <h3 className="text-xl font-heading font-semibold tracking-normal">
          {title}
        </h3>
        <p
          className={`mt-2 leading-relaxed tracking-normal ${
            useBackground ? "text-slate-200" : "text-slate-600"
          }`}
        >
          {description}
        </p>
      </div>
    </div>
  );
}
