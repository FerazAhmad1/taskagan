import React from "react";
import type { IBookItemProps } from "../utils/types";

const BookItem: React.FC<IBookItemProps> = ({
  title,
  subtitle,
  author_name = [],
  first_publish_year,
  cover_i,
}) => {
  const coverUrl = cover_i
    ? `https://covers.openlibrary.org/b/id/${cover_i}-M.jpg`
    : "https://m.media-amazon.com/images/I/81l3rZK4lnL._SY522_.jpg";

  return (
    <div className="flex gap-4 p-4  rounded-xl shadow-sm hover:shadow-md transition">
      {/* Book Cover */}
      <img
        src={coverUrl}
        alt={title}
        className="w-24 h-36 object-cover rounded-lg"
      />

      {/* Book Info */}
      <div className="flex flex-col">
        <h2 className="text-lg font-semibold">{title}</h2>
        {subtitle && <p className="text-gray-600 text-sm">{subtitle}</p>}
        {author_name.length > 0 && (
          <p className="text-gray-700 text-sm mt-1">
            By <span className="font-medium">{author_name.join(", ")}</span>
          </p>
        )}
        {first_publish_year && (
          <p className="text-gray-500 text-sm">
            First Published: {first_publish_year}
          </p>
        )}
      </div>
    </div>
  );
};

export default BookItem;
