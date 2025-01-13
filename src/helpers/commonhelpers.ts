import { NY_TIME_IMAGE_PREFIX } from "@/constants/commonConstants";
import { APIParams, NewsArticle, sources } from "@/types/news.types";

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

export const getAPIParams = (params: APIParams, apiSource: string) => {
  if (apiSource === "guardian") {
    return getGuardianAPIParams(params);
  }

  if (apiSource === "nyt") {
    return getNYTAPIParams();
  }

  if (apiSource === "newsapi") {
    return getNewsAPIParams(params);
  }
};

const getGuardianAPIParams = (params: APIParams) => {
  return {
    "api-key": import.meta.env.VITE_GUARDIAN_API_KEY,
    q: params?.searchQuery,
    tag: params?.categories?.join("|") || "news",
    "from-date": params.dateFrom,
    "to-date": params.dateTo,
    "show-tags": "contributor",
  };
};

const getNYTAPIParams = () => {
  return {
    "api-key": import.meta.env.VITE_NYTIMES_API_KEY,
  };
};

const getNewsAPIParams = (params: APIParams) => {
  return {
    from: params?.dateFrom,
    sources: "abc-news",
  };
};
