import { NY_TIME_IMAGE_PREFIX } from "@/constants/commonConstants";
import { NewsArticle, sources } from "@/types/news.types";

export const transformArticlesResponse: (
  articles: any[],
  sourceName: sources
) => NewsArticle[] = (articles, sourceName) => {
  if (sourceName === "newsapi") {
    return articles.map((article) => {
      return {
        id: article.id,
        title: article.title,
        description: article.description,
        category: article.category,
        url: article.url,
        imageUrl: article.urlToImage,
        publishedAt: article.publishedAt,
        author: article.author,
        source: sourceName,
      };
    });
  }

  if (sourceName === "guardian") {
    return articles.map((article) => {
      return {
        id: article.id,
        title: article.webTitle,
        description: article.description,
        category: article.sectionName,
        url: article.webUrl,
        imageUrl: article.urlToImage,
        publishedAt: article.publishedAt,
        source: sourceName,
      };
    });
  }

  return articles.map((article) => {
    return {
      id: article.id,
      title: article.headline.main,
      description: article.lead_paragraph,
      category: article.section_name,
      url: article.web_url,
      imageUrl: `${NY_TIME_IMAGE_PREFIX}${article.multimedia[0].url}`,
      publishedAt: article.publishedAt,
      source: sourceName,
    };
  });
};
