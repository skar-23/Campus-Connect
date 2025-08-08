import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { GraduationCap, Users, RefreshCw } from "lucide-react";
import { AlternativeSuggestion } from "@/types/senior";

interface NoResultsProps {
  alternativeSuggestions: AlternativeSuggestion[];
  onResetFilters: () => void;
}

const NoResults: React.FC<NoResultsProps> = ({ alternativeSuggestions, onResetFilters }) => {
  return (
    <div className="text-center py-12">
      <div className="max-w-2xl mx-auto">
        <GraduationCap className="h-20 w-20 text-purple-400 mx-auto mb-6" />
        
        <div className="mb-8">
          <h3 className="text-2xl font-bold text-gray-700 mb-3">
            🌟 Friendship has no boundaries! 🌟
          </h3>
          <p className="text-gray-600 mb-2">
            We couldn't find seniors matching your exact preferences, but don't worry!
          </p>
          <p className="text-purple-600 font-medium">
            Here are some amazing alternatives for you:
          </p>
        </div>

        {/* Alternative Suggestions */}
        {alternativeSuggestions.length > 0 && (
          <div className="space-y-4">
            {alternativeSuggestions.map((suggestion, index) => (
              <Card key={index} className="bg-gradient-to-r from-purple-50 to-pink-50 border-2 border-purple-200 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="text-left">
                      <h4 className="font-semibold text-gray-800 mb-2">
                        ✨ {suggestion.text}
                      </h4>
                      <p className="text-sm text-gray-600 mb-3">
                        {suggestion.seniors.length} senior{suggestion.seniors.length !== 1 ? 's' : ''} available
                      </p>
                      <div className="flex -space-x-2">
                        {suggestion.seniors.slice(0, 4).map((senior, idx) => (
                          <img
                            key={idx}
                            src={senior.avatar}
                            alt={senior.name}
                            className="w-8 h-8 rounded-full border-2 border-white object-cover"
                          />
                        ))}
                        {suggestion.seniors.length > 4 && (
                          <div className="w-8 h-8 rounded-full border-2 border-white bg-purple-100 flex items-center justify-center text-xs font-medium text-purple-600">
                            +{suggestion.seniors.length - 4}
                          </div>
                        )}
                      </div>
                    </div>
                    <Button
                      onClick={suggestion.action}
                      className="bg-gradient-to-r from-purple-500 to-pink-600 hover:from-purple-600 hover:to-pink-700 text-white rounded-full px-6 py-2 transform hover:scale-105 transition-all duration-300"
                    >
                      <RefreshCw className="mr-2 h-4 w-4" />
                      Show These
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}

        {/* Reset All Filters Button */}
        <div className="mt-8">
          <Button
            onClick={onResetFilters}
            variant="outline"
            className="border-2 border-purple-300 text-purple-600 hover:bg-purple-50 rounded-full px-8 py-3 font-medium"
          >
            <Users className="mr-2 h-4 w-4" />
            Show All Seniors
          </Button>
        </div>

        <div className="mt-6 text-sm text-gray-500">
          💝 Remember, the best connections often come from unexpected places!
        </div>
      </div>
    </div>
  );
};

export default NoResults;