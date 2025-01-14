import { NewsArticle } from "../../../types/news.types";
import NewsCard from "../NewsCard/NewsCard";
import { Skeleton } from "../../ui/skeleton";
import { RootState } from "@/store/store";
import { useAppSelector } from "@/store/hooks";

export const NewsFeed = () => {
  const { articles, loading } = useAppSelector(
    (state: RootState) => state.news
  );

  return (
    <div>
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {new Array(9).fill(undefined)?.map((_, index) => (
            <Skeleton
              // intentionally using index as the key below.
              key={`key-${index}`}
              className="w-full h-64 bg-slate-300 rounded-md"
            />
          ))}
        </div>
      ) : articles.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {articles?.map((article: NewsArticle, index) => (
            // intentionally making index as the key below as the id is not availabel in all the API sources.
            <div key={index}>
              <NewsCard
                title={article?.title}
                description={article?.description}
                image={article.imageUrl}
                source={article.source}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="flex flex-col justify-center align-middle min-h-[calc(100vh-120px)]">
          <h3 className="text-center font-bold text-3xl">No Articles Found</h3>
          <h5 className="text-center font-normal text-xl">
            Maybe try with different filters
          </h5>
        </div>
      )}
    </div>
  );
};

export default NewsFeed;
