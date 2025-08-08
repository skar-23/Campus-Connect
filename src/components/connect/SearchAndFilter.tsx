import React from "react";
import { Input } from "@/components/ui/input";
import { Search, Filter, MapPin } from "lucide-react";

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  selectedNativePlace: string;
  setSelectedNativePlace: (place: string) => void;
  resultCount: number;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedBranch,
  setSelectedBranch,
  selectedNativePlace,
  setSelectedNativePlace,
  resultCount
}) => {
  const branches = ["all", "Computer Science", "Mechanical Engineering", "Electrical Engineering", "Civil Engineering", "Electronics"];
  const nativePlaces = ["all", "Mumbai", "Delhi", "Bangalore", "Ahmedabad", "Jaipur", "Hyderabad"];

  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get guidance from experienced seniors who've been in your shoes. Find mentors, get advice, and accelerate your college journey! 🚀
          </p>
        </div>

        {/* Enhanced Search and Filter Section */}
        <div className="flex flex-col lg:flex-row gap-4 max-w-6xl mx-auto mb-12">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search by name, branch, or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 py-3 rounded-full border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm"
            />
          </div>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedBranch}
                onChange={(e) => setSelectedBranch(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-full border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer min-w-[200px]"
              >
                {branches.map(branch => (
                  <option key={branch} value={branch}>
                    {branch === "all" ? "All Branches" : branch}
                  </option>
                ))}
              </select>
            </div>

            <div className="relative">
              <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedNativePlace}
                onChange={(e) => setSelectedNativePlace(e.target.value)}
                className="pl-10 pr-8 py-3 rounded-full border-2 border-purple-200 focus:border-purple-500 bg-white/80 backdrop-blur-sm appearance-none cursor-pointer min-w-[180px]"
              >
                {nativePlaces.map(place => (
                  <option key={place} value={place}>
                    {place === "all" ? "All Native Places" : place}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Results Count */}
        {resultCount > 0 && (
          <div className="text-center mb-8">
            <p className="text-gray-600">
              Found <span className="font-semibold text-purple-600">{resultCount}</span> senior{resultCount !== 1 ? 's' : ''} ready to help you! 
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchAndFilter;