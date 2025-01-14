import {
  getAPIParams,
  transformArticlesResponse,
} from "../../../helpers/commonhelpers";
import { createNewsAPI } from "../newsApiInstance";
import { APIParams, NewsArticle } from "@/types/news.types";

const newsApi = createNewsAPI("https://newsapi.org/v2/everything");

export const fetchNewsApiNews = async (
  params: APIParams
): Promise<NewsArticle[]> => {
  try {
    const response = await newsApi.get("/", {
      params: getAPIParams(params, "newsapi"),
      headers: {
        "X-Api-Key": import.meta.env.VITE_NEWSAPI_API_KEY || "",
      },
    });

    if (response.data.articles.length > 0) {
      return transformArticlesResponse(response.data.articles, "newsapi");
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Failed to fetch Guardian news");
  }
};
