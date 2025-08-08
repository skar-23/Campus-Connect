import React, { useState, useEffect } from "react";
import Footer from "@/components/layout/Footer";
import ConnectNavbar from "@/components/layout/ConnectNavbar";
import SearchAndFilter from "@/components/connect/SearchAndFilter";
import SeniorCard from "@/components/connect/SeniorCard";
import LoadingSkeleton from "@/components/connect/LoadingSkeleton";
import NoResults from "@/components/connect/NoResults";
import { Senior, AlternativeSuggestion } from "@/types/senior";
import { mockSeniors } from "@/data/mockSeniors";

const ConnectWithSeniors: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedBranch, setSelectedBranch] = useState("all");
  const [selectedNativePlace, setSelectedNativePlace] = useState("all");
  const [seniors, setSeniors] = useState<Senior[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Load mock data
  useEffect(() => {
    setTimeout(() => {
      setSeniors(mockSeniors);
      setIsLoading(false);
    }, 1000);
  }, []);

  const filteredSeniors = seniors.filter(senior => {
    const matchesSearch = senior.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         senior.branch.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         senior.specialties.some(s => s.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesBranch = selectedBranch === "all" || senior.branch === selectedBranch;
    const matchesNativePlace = selectedNativePlace === "all" || senior.nativePlace === selectedNativePlace;
    return matchesSearch && matchesBranch && matchesNativePlace;
  });

  // Alternative suggestions when no exact match found
  const getAlternativeSuggestions = (): AlternativeSuggestion[] => {
    if (filteredSeniors.length > 0) return [];

    let suggestions: AlternativeSuggestion[] = [];

    // If both branch and native place are selected but no results
    if (selectedBranch !== "all" && selectedNativePlace !== "all") {
      // First try: Same branch, any native place
      const branchMatches = seniors.filter(senior => senior.branch === selectedBranch);
      if (branchMatches.length > 0) {
        suggestions.push({
          type: "branch",
          text: `${selectedBranch} students from all locations`,
          seniors: branchMatches,
          action: () => {
            setSelectedNativePlace("all");
          }
        });
      }

      // Second try: Same native place, any branch
      const nativePlaceMatches = seniors.filter(senior => senior.nativePlace === selectedNativePlace);
      if (nativePlaceMatches.length > 0) {
        suggestions.push({
          type: "native",
          text: `Students from ${selectedNativePlace} (all branches)`,
          seniors: nativePlaceMatches,
          action: () => {
            setSelectedBranch("all");
          }
        });
      }
    }
    // If only branch is selected but no results
    else if (selectedBranch !== "all" && selectedNativePlace === "all") {
      const allSeniors = seniors.filter(senior => senior.id); // All seniors
      if (allSeniors.length > 0) {
        suggestions.push({
          type: "all",
          text: "All available seniors",
          seniors: allSeniors,
          action: () => {
            setSelectedBranch("all");
          }
        });
      }
    }
    // If only native place is selected but no results
    else if (selectedBranch === "all" && selectedNativePlace !== "all") {
      const allSeniors = seniors.filter(senior => senior.id); // All seniors
      if (allSeniors.length > 0) {
        suggestions.push({
          type: "all",
          text: "All available seniors",
          seniors: allSeniors,
          action: () => {
            setSelectedNativePlace("all");
          }
        });
      }
    }

    return suggestions;
  };

  const alternativeSuggestions = getAlternativeSuggestions();

  const handleResetFilters = () => {
    setSelectedBranch("all");
    setSelectedNativePlace("all");
    setSearchTerm("");
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-pink-50 via-purple-50 to-blue-50">
      {/* Floating decorative elements */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-20 left-10 w-32 h-32 bg-gradient-to-r from-pink-300 to-purple-300 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-24 h-24 bg-gradient-to-r from-yellow-300 to-orange-300 rounded-full opacity-20 animate-bounce"></div>
        <div className="absolute bottom-32 left-1/4 w-40 h-40 bg-gradient-to-r from-purple-300 to-blue-300 rounded-full opacity-15 animate-pulse"></div>
      </div>

      {/* Navbar */}
      <ConnectNavbar 
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
      />

      {/* Main Content */}
      <main className="flex-grow relative z-10 pt-24">
        {/* Search and Filter Section */}
        <SearchAndFilter
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          selectedBranch={selectedBranch}
          setSelectedBranch={setSelectedBranch}
          selectedNativePlace={selectedNativePlace}
          setSelectedNativePlace={setSelectedNativePlace}
          resultCount={filteredSeniors.length}
        />

        {/* Seniors Grid */}
        <section className="py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-7xl mx-auto">
            {isLoading ? (
              <LoadingSkeleton />
            ) : filteredSeniors.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredSeniors.map((senior) => (
                  <SeniorCard key={senior.id} senior={senior} />
                ))}
              </div>
            ) : (
              <NoResults 
                alternativeSuggestions={alternativeSuggestions}
                onResetFilters={handleResetFilters}
              />
            )}
          </div>
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};

export default ConnectWithSeniors;