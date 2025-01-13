export type sources = "guardian" | "nyt" | "newsapi";

export interface NewsState {
  articles: NewsArticle[];
  loading: boolean;
  errors: Record<string, string | null>;
  filters: NewsFilters;
}

export interface NewsArticle {
  id: string;
  title: string;
  description: string;
  source: sources;
  author?: string;
  publishedAt: string;
  url: string;
  imageUrl: string;
  category?: string;
}

export interface NewsFilters {
  searchQuery?: string;
  categories?: string[] | undefined;
  dateFrom: Date;
  dateTo: Date;
  authors?: string[] | undefined;
  source: string;
}

export interface APIParams extends NewsFilters {}
export interface Category {
  id: string;
  name: string;
}

export interface Author {
  id: string;
  name: string;
  source: string;
}
