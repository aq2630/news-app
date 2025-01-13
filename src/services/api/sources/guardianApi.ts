import { transformArticlesResponse } from "../../../helpers/commonhelpers";
import { createNewsAPI } from "../newsApiInstance";
import { APIParams, NewsArticle } from "@/types/news.types";

const guardianApi = createNewsAPI("https://content.guardianapis.com");

export const fetchGuardianNews = async (
  params: APIParams
): Promise<NewsArticle[]> => {
  try {
    console.log(params);
    const response = await guardianApi.get("/search", {
      params: {
        "api-key": import.meta.env.VITE_GUARDIAN_API_KEY,
        q: params?.searchQuery,
        tag: params?.categories?.join("|") || "news",
        "from-date": params.dateFrom,
        "to-date": params.dateTo,
        "show-tags": "contributor",
        // page: params.page,
      },
    });
    return transformArticlesResponse(
      response.data.response.results,
      "guardian"
    );
  } catch (error) {
    throw new Error("Failed to fetch Guardian news");
  }
};
