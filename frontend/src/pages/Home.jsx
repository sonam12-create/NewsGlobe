// `${import.meta.env.VITE_URL}${query}&apikey=${import.meta.env.VITE_API_KEY}`

import { useContext, useEffect, useState } from "react";
import NewsCard from "../components/Card";
import axios from "axios";
import { NewsContext } from "../context/NewsContext";

function Home() {
  const [news, setNews] = useState([]);
  // const [query, setQuery] = useState("India");
  const {query} = useContext(NewsContext)

  const fetchNews = async () => {
    try {
      const getNews = await axios.get(
        `https://newsapi.org/v2/everything?q=${query}&apiKey=6041f39ba9f04857a60574dcacb1977f`
      );
      // console.log(getNews.data);

      const filteredNews = getNews.data.articles;
      const final = filteredNews.filter((item) => item.urlToImage !== null);

      setNews(final);
    } catch (error) {
      console.log(error);
    }
    // console.log(news)
  };

  useEffect(() => {
    fetchNews();
  }, [query]);

  return (
    <div className="flex flex-wrap gap-8 justify-center bg-gray-100 min-h-screen p-6">
      {news.map((item, index) => (
        <NewsCard
          key={index}
          author={item.author}
          title={item.title}
          description={item.description}
          url={item.url}
          urlToImage={item.urlToImage}
          publishedAt={item.publishedAt}
          source={item.source.name}
        />
      ))}
    </div>
  );
}

export default Home;
