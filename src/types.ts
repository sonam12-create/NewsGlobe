export interface NewsArticle {
  title: string;
  description: string;
  url: string;
  urlToImage: string;
  publishedAt: string;
  source: {
    name: string;
  };
}

export interface Note {
  id: string;
  title: string;
  content: string;
  createdAt: string;
}