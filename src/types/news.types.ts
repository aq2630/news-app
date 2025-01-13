export type sources = "guardian" | "nyt" | "newsapi";

export interface NewsState {
  articles: NewsArticle[];
  categories: Category[];
  authors: Author[];
  loading: boolean;
  errors: Record<string, string | null>;
  page: number;
  hasMore: boolean;
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
  categories?: string[];
  // dateFrom and dateTo will be date format type
  dateFrom: Date;
  dateTo: Date;
  authors?: string[];
  source: string;
}

export interface APIParams extends NewsFilters {
  page: number;
}

export interface Category {
  id: string;
  name: string;
}

export interface Author {
  id: string;
  name: string;
  source: string;
}

export interface APIParams {
  page: number;
  searchQuery?: string;
  categories?: string[];
  dateFrom: string;
  dateTo: string;
  authors?: string[];
  sources: string[];
}
