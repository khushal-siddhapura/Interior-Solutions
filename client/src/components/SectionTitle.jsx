import React from "react";

export default function SectionTitle({ title, subtitle, className }) {
  // 1. Accept className as a prop

  // 2. Define the base styles that are always the same
  const baseClasses =
    "text-3xl sm:text-3xl lg:text-4xl font-heading font-bold tracking-wide py-2";

  // 3. Conditionally set the color styles
  // If a className is passed, use it. Otherwise, use the default gradient.
  const colorClasses = className
    ? className
    : "bg-gradient-to-r from-gray-500 to-slate-800 bg-clip-text text-transparent";

  return (
    <div className="text-center mb-12 sm:mb-16">
      <h2 className={`${baseClasses} ${colorClasses}`}>
        {" "}
        {/* 4. Combine the classes here */}
        {title}
      </h2>

      {subtitle && (
        <p className="text-slate-600 mt-4 max-w-2xl mx-auto tracking-wide text-base sm:text-lg">
          {subtitle}
        </p>
      )}
    </div>
  );
}
