import React from "react";
import { Search, Filter, MapPin, ChevronDown, X } from "lucide-react";

interface SearchAndFilterProps {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
  selectedBranch: string;
  setSelectedBranch: (branch: string) => void;
  selectedState: string;
  setSelectedState: (state: string) => void;
  resultCount?: number;
  showResults?: boolean;
}

const branches = [
  { value: "all", label: "All Branches" },
  { value: "Computer Science Engineering", label: "Computer Science Engineering" },
  { value: "Information Technology", label: "Information Technology" },
  { value: "Civil Engineering", label: "Civil Engineering" },
  { value: "Mechanical Engineering", label: "Mechanical Engineering" },
  { value: "Electronics & Communication Engineering", label: "Electronics & Communication Engineering" },
  { value: "Electrical Engineering", label: "Electrical Engineering" },
  { value: "Chemical Engineering", label: "Chemical Engineering" },
  { value: "Biotechnology", label: "Biotechnology" },
  { value: "Industrial & Production Engineering", label: "Industrial & Production Engineering" },
  { value: "Instrumentation & Control Engineering", label: "Instrumentation & Control Engineering" },
];

const states = [
  { value: "all", label: "All States" },
  { value: "Andhra Pradesh", label: "Andhra Pradesh" },
  { value: "Arunachal Pradesh", label: "Arunachal Pradesh" },
  { value: "Assam", label: "Assam" },
  { value: "Bihar", label: "Bihar" },
  { value: "Chhattisgarh", label: "Chhattisgarh" },
  { value: "Goa", label: "Goa" },
  { value: "Gujarat", label: "Gujarat" },
  { value: "Haryana", label: "Haryana" },
  { value: "Himachal Pradesh", label: "Himachal Pradesh" },
  { value: "Jharkhand", label: "Jharkhand" },
  { value: "Karnataka", label: "Karnataka" },
  { value: "Kerala", label: "Kerala" },
  { value: "Madhya Pradesh", label: "Madhya Pradesh" },
  { value: "Maharashtra", label: "Maharashtra" },
  { value: "Manipur", label: "Manipur" },
  { value: "Meghalaya", label: "Meghalaya" },
  { value: "Mizoram", label: "Mizoram" },
  { value: "Nagaland", label: "Nagaland" },
  { value: "Odisha", label: "Odisha" },
  { value: "Punjab", label: "Punjab" },
  { value: "Rajasthan", label: "Rajasthan" },
  { value: "Sikkim", label: "Sikkim" },
  { value: "Tamil Nadu", label: "Tamil Nadu" },
  { value: "Telangana", label: "Telangana" },
  { value: "Tripura", label: "Tripura" },
  { value: "Uttar Pradesh", label: "Uttar Pradesh" },
  { value: "Uttarakhand", label: "Uttarakhand" },
  { value: "West Bengal", label: "West Bengal" },
  { value: "Andaman and Nicobar Islands", label: "Andaman and Nicobar Islands" },
  { value: "Chandigarh", label: "Chandigarh" },
  { value: "Dadra and Nagar Haveli and Daman and Diu", label: "Dadra and Nagar Haveli and Daman and Diu" },
  { value: "Delhi", label: "Delhi" },
  { value: "Jammu and Kashmir", label: "Jammu and Kashmir" },
  { value: "Ladakh", label: "Ladakh" },
  { value: "Lakshadweep", label: "Lakshadweep" },
  { value: "Puducherry", label: "Puducherry" },
];

const SearchableCombobox = ({ 
  options, 
  value, 
  onChange, 
  placeholder, 
  icon: Icon, 
  iconColor,
  bgColor,
  borderColor,
  textColor,
  minWidth = "220px"
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [inputText, setInputText] = React.useState("");
  const [highlightedIndex, setHighlightedIndex] = React.useState(-1);
  const inputRef = React.useRef(null);
  const containerRef = React.useRef(null);

  // Get selected option
  const selectedOption = options.find(option => option.value === value);

  // Initialize input text with selected option
  React.useEffect(() => {
    if (selectedOption && !isOpen) {
      setInputText(selectedOption.label);
    } else if (!selectedOption && !isOpen) {
      setInputText("");
    }
  }, [value, selectedOption, isOpen]);

  // Filter options based on what user is typing
  const filteredOptions = inputText.trim() === "" 
    ? options 
    : options.filter(option =>
        option.label.toLowerCase().includes(inputText.toLowerCase())
      );

  // Scroll highlighted option into view
  React.useEffect(() => {
    if (isOpen && highlightedIndex >= 0) {
      const dropdownElement = containerRef.current?.querySelector('.max-h-60.overflow-y-auto');
      const highlightedElement = dropdownElement?.children[highlightedIndex];
      
      if (highlightedElement && dropdownElement) {
        const elementTop = highlightedElement.offsetTop;
        const elementBottom = elementTop + highlightedElement.offsetHeight;
        const containerTop = dropdownElement.scrollTop;
        const containerBottom = containerTop + dropdownElement.offsetHeight;
        
        if (elementTop < containerTop) {
          dropdownElement.scrollTop = elementTop;
        } else if (elementBottom > containerBottom) {
          dropdownElement.scrollTop = elementBottom - dropdownElement.offsetHeight;
        }
      }
    }
  }, [highlightedIndex, isOpen]);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        // Reset to selected option when clicking outside
        if (selectedOption) {
          setInputText(selectedOption.label);
        } else {
          setInputText("");
        }
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [selectedOption]);

  const selectOption = (option) => {
    onChange(option.value);
    setIsOpen(false);
    setHighlightedIndex(-1);
  };

  const handleKeyDown = (e) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        if (!isOpen) {
          setIsOpen(true);
          setHighlightedIndex(0);
        } else {
          setHighlightedIndex(prev => 
            prev < filteredOptions.length - 1 ? prev + 1 : 0
          );
        }
        break;
        
      case 'ArrowUp':
        e.preventDefault();
        if (isOpen) {
          setHighlightedIndex(prev => 
            prev > 0 ? prev - 1 : filteredOptions.length - 1
          );
        }
        break;
        
      case 'Enter':
        e.preventDefault();
        if (isOpen && highlightedIndex >= 0 && filteredOptions[highlightedIndex]) {
          const option = filteredOptions[highlightedIndex];
          selectOption(option);
        }
        break;
        
      case 'Escape':
        e.preventDefault();
        setIsOpen(false);
        setHighlightedIndex(-1);
        // Reset to current selection
        if (selectedOption) {
          setInputText(selectedOption.label);
        } else {
          setInputText("");
        }
        break;
        
      case 'Tab':
        setIsOpen(false);
        setHighlightedIndex(-1);
        break;
    }
  };

  const handleOptionClick = (option) => {
    selectOption(option);
  };

  const handleInputChange = (e) => {
    const newText = e.target.value;
    setInputText(newText);
    
    if (!isOpen) {
      setIsOpen(true);
    }
    
    setHighlightedIndex(-1);
    
    // Clear selection if user clears the input
    if (newText === "") {
      onChange("");
    }
  };

  const handleClear = (e) => {
    e.stopPropagation();
    onChange("");
    setInputText("");
    setIsOpen(false);
    inputRef.current?.focus();
  };

  const handleToggle = () => {
    if (isOpen) {
      setIsOpen(false);
    } else {
      setIsOpen(true);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="relative" ref={containerRef} style={{ minWidth }}>
      <div className="relative">
        <Icon className={`absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 ${iconColor}`} />
        
        <input
          ref={inputRef}
          type="text"
          value={inputText}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className={`
            w-full pl-10 pr-16 py-3 rounded-full border-2 font-medium shadow-sm 
            transition-all duration-200 
            focus:outline-none focus:ring-2 focus:ring-opacity-50
            ${bgColor} ${borderColor} ${textColor}
          `}
          autoComplete="off"
        />

        <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center gap-1">
          {selectedOption && (
            <button
              type="button"
              onClick={handleClear}
              className="p-1 hover:bg-gray-200 rounded-full transition-colors"
            >
              <X className="h-3 w-3 text-gray-400" />
            </button>
          )}
          <button
            type="button"
            onClick={handleToggle}
            className="p-1 hover:bg-gray-200 rounded-full transition-colors"
          >
            <ChevronDown className={`h-4 w-4 text-gray-400 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg max-h-60 overflow-hidden">
          <div className="max-h-60 overflow-y-auto">
            {filteredOptions.map((option, index) => (
              <div
                key={option.value}
                onClick={() => handleOptionClick(option)}
                onMouseEnter={() => setHighlightedIndex(index)}
                className={`
                  px-3 py-2 text-sm cursor-pointer transition-colors
                  ${index === highlightedIndex ? 'bg-purple-100 text-purple-800 font-medium' : 'hover:bg-gray-50'}
                  ${value === option.value ? 'bg-purple-50 text-purple-700 font-semibold' : 'text-gray-700'}
                `}
              >
                {option.label}
              </div>
            ))}
          </div>
        </div>
      )}
      
      {isOpen && filteredOptions.length === 0 && inputText && (
        <div className="absolute z-50 w-full mt-2 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="px-3 py-2 text-sm text-gray-500">
            No results found for "{inputText}"
          </div>
        </div>
      )}
    </div>
  );
};

const SearchAndFilterSection: React.FC<SearchAndFilterProps> = ({
  searchTerm,
  setSearchTerm,
  selectedBranch,
  setSelectedBranch,
  selectedState,
  setSelectedState,
  resultCount = 0,
  showResults = true
}) => {
  return (
    <section className="py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Find Your Perfect Senior Mentor</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Get guidance from experienced seniors who've been in your shoes.
            Find mentors, get advice, and accelerate your college journey! 🚀
          </p>
        </div>

        {/* Search Bar */}
        <div className="flex justify-center mb-6">
          <div className="relative w-full max-w-md">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-pink-500 h-5 w-5" />
            <input
              type="text"
              placeholder="Search by name, branch, or specialties..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 pr-4 py-3 rounded-full border-2 border-pink-400 focus:border-pink-600 bg-white shadow-md text-base font-medium transition-all duration-200 w-full focus:outline-none focus:ring-2 focus:ring-pink-200"
            />
          </div>
        </div>

        {/* Filter Comboboxes */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-6xl mx-auto mb-6 justify-center items-center">
          {/* Branch Combobox */}
          <SearchableCombobox
            options={branches}
            value={selectedBranch}
            onChange={setSelectedBranch}
            placeholder="Type or select branch..."
            icon={Filter}
            iconColor="text-purple-400"
            bgColor="bg-purple-50 focus:bg-white"
            borderColor="border-purple-200 focus:border-purple-500"
            textColor="text-purple-700"
            minWidth="240px"
          />

          {/* State Combobox */}
          <SearchableCombobox
            options={states}
            value={selectedState}
            onChange={setSelectedState}
            placeholder="Type or select state..."
            icon={MapPin}
            iconColor="text-blue-400"
            bgColor="bg-blue-50 focus:bg-white"
            borderColor="border-blue-200 focus:border-blue-500"
            textColor="text-blue-700"
            minWidth="200px"
          />
        </div>

        {/* Optional Results Count Display */}
        {showResults && (searchTerm || selectedBranch || selectedState) && (
          <div className="text-center">
            <p className="text-gray-600">
              {resultCount > 0 ? (
                <>
                  Found{" "}
                  <span className="font-semibold text-purple-600">
                    {resultCount}
                  </span>{" "}
                  senior{resultCount === 1 ? '' : 's'} ready to help you! 🎯
                </>
              ) : (
                <span className="text-orange-600 font-medium">
                  No seniors found matching your criteria. Try adjusting your filters! 🔍
                </span>
              )}
            </p>
          </div>
        )}
      </div>
    </section>
  );
};

export default SearchAndFilterSection;