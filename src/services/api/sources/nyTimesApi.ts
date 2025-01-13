import { transformArticlesResponse } from "../../../helpers/commonhelpers";
import { createNewsAPI } from "../newsApiInstance";
import { APIParams, NewsArticle } from "@/types/news.types";

const newsApi = createNewsAPI("https://api.nytimes.com/svc/search/v2");

export const fetchNyTimesApiNews = async (
  params: APIParams
): Promise<NewsArticle[]> => {
  try {
    const response = await newsApi.get("/articlesearch.json", {
      params: {
        "api-key": import.meta.env.VITE_NYTIMES_API_KEY,
        page: params.page,
        // ...params,
      },
    });
    return transformArticlesResponse(response.data.response.docs, "nyt");
  } catch (error) {
    throw new Error("Failed to fetch Guardian news");
  }
};
