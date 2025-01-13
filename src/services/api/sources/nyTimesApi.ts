import {
  getAPIParams,
  transformArticlesResponse,
} from "../../../helpers/commonhelpers";
import { createNewsAPI } from "../newsApiInstance";
import { APIParams, NewsArticle } from "@/types/news.types";

const newsApi = createNewsAPI("https://api.nytimes.com/svc/search/v2");

export const fetchNyTimesApiNews = async (
  params: APIParams
): Promise<NewsArticle[]> => {
  try {
    const response = await newsApi.get("/articlesearch.json", {
      params: getAPIParams(params, "nyt"),
    });
    return transformArticlesResponse(response.data.response.docs, "nyt");
  } catch (error) {
    throw new Error("Failed to fetch Guardian news");
  }
};
