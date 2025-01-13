import React from "react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import articlePlaceholderImage from "../../../assets/images/article-placeholder.png";

interface NewsCardProps {
  title: string;
  description: string;
  image: string;
  source: "nyt" | "guardian" | "newsapi";
}

const sources = {
  nyt: "New York Times",
  guardian: "The Guardian",
  newsapi: "NewsAPI",
};

const NewsCard: React.FC<NewsCardProps> = ({
  title,
  description,
  image = "",
  source,
}) => {
  return (
    <Card className="max-w-md border border-gray-200 hover:shadow-md transition-shadow">
      <CardHeader>
        <div>
          <h4 className="font-semibold">News Source: {sources[source]}</h4>
        </div>
        <div className="relative w-full h-48">
          <img
            src={image || articlePlaceholderImage}
            alt={title}
            className="w-full h-full object-cover rounded-t-md"
          />
        </div>
        <CardTitle className="line-clamp-2">{title}</CardTitle>
        <CardDescription className="text-gray-500">News</CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-gray-600 line-clamp-3">{description}</p>
      </CardContent>
    </Card>
  );
};

export default NewsCard;
