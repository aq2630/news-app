import { useAppDispatch, useAppSelector } from "../../store/hooks";
import { useEffect } from "react";
import { fetchNews } from "@/store/slices/newsActions";
import { RootState } from "@/store/store";
import NewsFeed from "@/components/common/NewsFeed/NewsFeed";
import Navbar from "@/components/common/Navbar/Navbar";

const Home = () => {
  const dispatch = useAppDispatch();

  const { filters } = useAppSelector((state: RootState) => state.news);

  useEffect(() => {
    dispatch(fetchNews({ ...filters }));
  }, [filters]);

  return (
    <div className="container mx-auto px-4 py-8">
      <Navbar />
      <NewsFeed />
    </div>
  );
};

export default Home;
