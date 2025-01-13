import { FC } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { NewsArticle } from "../../../types/news.types";
import NewsCard from "../NewsCard/NewsCard";
import { Skeleton } from "../../ui/skeleton";

interface NewsFeedProps {
  articles: NewsArticle[];
  loading: boolean;
  hasMore: boolean;
  fetchMoreData: () => void;
}

export const NewsFeed: FC<NewsFeedProps> = ({
  articles,
  loading,
  hasMore,
  fetchMoreData,
}) => {
  return (
    <div>
      {loading && articles.length === 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {new Array(9).fill(undefined)?.map((_, index) => (
            <Skeleton
              key={`key-${index}`}
              className="w-full h-64 bg-slate-300 rounded-md"
            />
          ))}
        </div>
      ) : (
        <InfiniteScroll
          dataLength={10000}
          next={fetchMoreData}
          hasMore={hasMore}
          loader={<h4>Loading...</h4>}
          endMessage={
            <p style={{ textAlign: "center" }}>
              <b>Yay! You have seen it all</b>
            </p>
          }
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {articles?.map((article: NewsArticle) => (
              <div key={article?.id}>
                <NewsCard
                  title={article?.title}
                  description={article?.description}
                  image={article.imageUrl}
                  source={article.source}
                />
              </div>
            ))}
          </div>
        </InfiniteScroll>
      )}
    </div>
  );
};

export default NewsFeed;
