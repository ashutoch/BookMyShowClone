import { useState, useMemo } from 'react';
import { FilterSidebar } from '../components/FilterSidebar';
import { SportCard } from '../components/SportCard';
import { Carousel } from '../components/Carousel';
import { sports, sportCategories } from '../data/moviesData';

export default function Sports() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredSports = useMemo(() => {
    return sports.filter(sport => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(sport.category)) {
        return false;
      }
      return true;
    });
  }, [selectedCategories]);

  const handleClearAll = () => {
    setSelectedLanguages([]);
    setSelectedGenres([]);
    setSelectedFormats([]);
    setSelectedDates([]);
    setSelectedCategories([]);
  };

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Category Filter Row */}
      <div className="mb-6 pb-4 border-b">
        <div className="flex items-center gap-2 flex-wrap">
          {sportCategories.map(category => (
            <button
              key={category}
              onClick={() => {
                if (selectedCategories.includes(category)) {
                  setSelectedCategories(selectedCategories.filter(c => c !== category));
                } else {
                  setSelectedCategories([...selectedCategories, category]);
                }
              }}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                selectedCategories.includes(category)
                  ? 'bg-rose-600 border-rose-600 text-white'
                  : 'border-rose-600 text-rose-600 hover:bg-rose-50'
              }`}
            >
              {category}
            </button>
          ))}
          {selectedCategories.length > 0 && (
            <button
              onClick={() => setSelectedCategories([])}
              className="text-rose-600 text-sm hover:underline ml-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Featured Sports Carousel */}
      <div className="mb-8">
        <Carousel title="Featured Sports">
          {sports.map(sport => (
            <div key={sport.id} className="px-2">
              <SportCard sport={sport} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar
            type="sports"
            selectedLanguages={selectedLanguages}
            selectedGenres={selectedGenres}
            selectedFormats={selectedFormats}
            selectedDates={selectedDates}
            selectedCategories={selectedCategories}
            onLanguageChange={setSelectedLanguages}
            onGenreChange={setSelectedGenres}
            onFormatChange={setSelectedFormats}
            onDateChange={setSelectedDates}
            onCategoryChange={setSelectedCategories}
            onClearAll={handleClearAll}
          />
        </div>

        {/* Sports Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {filteredSports.length} {filteredSports.length === 1 ? 'Activity' : 'Activities'}
            </h3>
            <button className="lg:hidden px-4 py-2 border border-rose-600 text-rose-600 rounded-md hover:bg-rose-50 transition">
              Filters
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredSports.map(sport => (
              <SportCard key={sport.id} sport={sport} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}