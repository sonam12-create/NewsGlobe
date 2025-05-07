import React from 'react';

const NewsCard = ({ source, author, title, description, url, urlToImage, publishedAt }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden max-w-md mx-auto hover:shadow-lg transition">
      {urlToImage && (
        <img
          src={urlToImage}
          alt={title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-5">
        <div className="text-sm text-gray-500 mb-2">{source?.name}</div>
        <h2 className="text-xl font-semibold text-gray-800 mb-2">{title}</h2>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        <div className="flex items-center justify-between text-sm text-gray-400">
          <span>{new Date(publishedAt).toLocaleDateString()}</span>
          <a
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            Read More
          </a>
        </div>
      </div>
    </div>
  );
};

export default NewsCard;