import { createAsyncThunk } from "@reduxjs/toolkit";
import { fetchGuardianNews } from "@/services/api/sources/guardianApi";
import { fetchNewsApiNews } from "../../services/api/sources/newsAPI";
import { fetchNyTimesApiNews } from "../../services/api/sources/nyTimesApi";
import { APIParams, NewsArticle } from "@/types/news.types";

export const fetchNews = createAsyncThunk(
  "news/fetchNews",
  async (filters: APIParams, { rejectWithValue }: { rejectWithValue: any }) => {
    try {
      if (filters.source === "all") {
        const promises = [
          fetchGuardianNews(filters),
          fetchNyTimesApiNews(filters),
          fetchNewsApiNews(filters),
        ];

        const results = await Promise.allSettled(promises);
        const articles = results.flatMap((result) =>
          result.status === "fulfilled" ? result.value : []
        );

        if (articles.length === 0) {
          return rejectWithValue("No news available from any source");
        }

        return articles;
      }

      try {
        let articles: NewsArticle[];
        switch (filters.source) {
          case "guardian":
            articles = await fetchGuardianNews(filters);
            break;
          case "nyt":
            articles = await fetchNyTimesApiNews(filters);
            break;
          case "newsapi":
            articles = await fetchNewsApiNews(filters);
            break;
          default:
            articles = [];
        }

        if (articles.length === 0) {
          return rejectWithValue(`No news available from ${filters.source}`);
        }

        return articles;
      } catch (error) {
        return rejectWithValue(`Failed to fetch news from ${filters.source}`);
      }
    } catch (error) {
      return rejectWithValue("Failed to fetch news from all sources");
    }
  }
);
