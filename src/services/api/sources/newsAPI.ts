import { transformArticlesResponse } from "../../../helpers/commonhelpers";
import { createNewsAPI } from "../newsApiInstance";
import { APIParams, NewsArticle } from "@/types/news.types";

const newsApi = createNewsAPI("https://newsapi.org/v2/everything");

export const fetchNewsApiNews = async (
  params?: APIParams
): Promise<NewsArticle[]> => {
  try {
    const response = await newsApi.get("/", {
      params: {
        from: params?.dateFrom,
        sources: "abc-news",
        // ...params,
      },
      headers: {
        "X-Api-Key": import.meta.env.VITE_NEWSAPI_API_KEY || "",
      },
    });

    return transformArticlesResponse(response.data.articles, "newsapi");
  } catch (error) {
    throw new Error("Failed to fetch Guardian news");
  }
};
