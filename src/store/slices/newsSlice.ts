import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NewsArticle, NewsFilters, NewsState } from "@/types/news.types";
import { fetchNews } from "./newsActions";
import { addDays } from "date-fns";

const initialState: NewsState = {
  articles: [],
  categories: [],
  authors: [],
  loading: false,
  errors: {},
  page: 1,
  hasMore: true,
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
      state.page = 1;
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
          state.articles =
            state.page === 1
              ? action.payload
              : [...state.articles, ...action.payload];
          state.page = state.page + 1;
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

export const { updateFilters } = newsSlice.actions;
export default newsSlice.reducer;