import React from 'react';
import { BookmarkPlus } from 'lucide-react';
import { NewsArticle } from '../types';

interface NewsCardProps {
  article: NewsArticle;
  onTakeNote: (article: NewsArticle) => void;
}

export const NewsCard: React.FC<NewsCardProps> = ({ article, onTakeNote }) => {
  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
      )}
      <div className="p-4">
        <h3 className="text-lg font-semibold mb-2 dark:text-white">{article.title}</h3>
        <p className="text-gray-600 dark:text-gray-300 mb-4">{article.description}</p>
        <div className="flex justify-between items-center">
          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 dark:text-blue-400 hover:underline"
          >
            Read more
          </a>
          <button
            onClick={() => onTakeNote(article)}
            className="flex items-center gap-1 text-gray-600 dark:text-gray-300 hover:text-blue-600 dark:hover:text-blue-400"
          >
            <BookmarkPlus className="w-5 h-5" />
            Take Note
          </button>
        </div>
      </div>
    </div>
  );
};