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
        `${import.meta.env.VITE_URL}${query}&lang=en&apikey=${import.meta.env.VITE_API_KEY}`
      );
      

      const filteredNews = getNews.data.articles;
      const final = (filteredNews || []).filter((item) => item.image !== null);
    
      setNews(final);
      console.log(final)
    } catch (error) {
      console.log(error);
    }
 
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
          urlToImage={item.image}
          publishedAt={item.publishedAt}
          source={item.source?.name}
        />
      ))}
    </div>
  );
}

export default Home;
