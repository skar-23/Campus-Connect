import React from "react";
import { Card, CardContent } from "@/components/ui/card";

const LoadingSkeleton: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[...Array(6)].map((_, i) => (
        <Card key={i} className="h-80 bg-white/80 backdrop-blur-sm animate-pulse">
          <CardContent className="p-6">
            <div className="flex items-center space-x-4 mb-4">
              <div className="w-16 h-16 bg-gray-300 rounded-full"></div>
              <div className="space-y-2">
                <div className="h-4 bg-gray-300 rounded w-24"></div>
                <div className="h-3 bg-gray-300 rounded w-32"></div>
              </div>
            </div>
            <div className="space-y-2">
              <div className="h-3 bg-gray-300 rounded"></div>
              <div className="h-3 bg-gray-300 rounded w-3/4"></div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default LoadingSkeleton;