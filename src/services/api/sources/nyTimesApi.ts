import {
  getAPIParams,
  transformArticlesResponse,
} from "@/helpers/commonhelpers";
import { createNewsAPI } from "../newsApiInstance";
import { APIParams, NewsArticle } from "@/types/news.types";

const NYTimesAPI = createNewsAPI("https://api.nytimes.com/svc/search/v2");

export const fetchNyTimesApiNews = async (
  params: APIParams
): Promise<NewsArticle[]> => {
  try {
    const response = await NYTimesAPI.get("/articlesearch.json", {
      params: getAPIParams(params, "nyt"),
    });

    if (response.data.response.docs.length > 0) {
      return transformArticlesResponse(response.data.response.docs, "nyt");
    } else {
      return [];
    }
  } catch (error) {
    throw new Error("Failed to fetch Ny Times news");
  }
};
