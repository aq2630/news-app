import {
  getAPIParams,
  transformArticlesResponse,
} from "../../../helpers/commonhelpers";
import { createNewsAPI } from "../newsApiInstance";
import { APIParams, NewsArticle } from "@/types/news.types";

const guardianApi = createNewsAPI("https://content.guardianapis.com");

export const fetchGuardianNews = async (
  params: APIParams
): Promise<NewsArticle[]> => {
  try {
    const response = await guardianApi.get("/search", {
      params: getAPIParams(params, "guardian"),
    });
    return transformArticlesResponse(
      response.data.response.results,
      "guardian"
    );
  } catch (error) {
    throw new Error("Failed to fetch Guardian news");
  }
};
