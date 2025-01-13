import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsArticle, NewsFilters, NewsState } from "@/types/news.types";
import { fetchNews } from "./newsActions";
import { addDays } from "date-fns";

const initialState: NewsState = {
  articles: [],
  loading: false,
  errors: {},
  filters: {
    authors: [],
    source: "all",
    categories: [],
    dateFrom: new Date(2025, 0, 1),
    dateTo: addDays(new Date(2025, 0, 1), 13),
  },
};

const newsSlice = createSlice({
  name: "news",
  initialState,
  reducers: {
    updateFilters(
      state: NewsState,
      action: PayloadAction<Partial<NewsFilters>>
    ) {
      state.filters = { ...state.filters, ...action.payload };
      state.articles = [];
    },
    resetFilters(state: NewsState) {
      state.filters = initialState.filters;
      state.articles = [];
    },
  },
  extraReducers: (builder: any) => {
    builder
      .addCase(fetchNews.pending, (state: NewsState) => {
        state.loading = true;
      })
      .addCase(
        fetchNews.fulfilled,
        (state: NewsState, action: PayloadAction<NewsArticle[]>) => {
          state.loading = false;
          state.articles = action.payload;
          state.errors = {};
        }
      )
      .addCase(
        fetchNews.rejected,
        (state: NewsState, action: PayloadAction<any>) => {
          state.loading = false;
          state.errors.global = action.payload;
        }
      );
  },
});

export const { updateFilters, resetFilters } = newsSlice.actions;
export default newsSlice.reducer;
