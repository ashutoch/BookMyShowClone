import { useState, useMemo } from 'react';
import { FilterSidebar } from '../components/FilterSidebar';
import { MovieCard } from '../components/MovieCard';
import { Carousel } from '../components/Carousel';
import { movies, languages as allLanguages } from '../data/moviesData';
import { ChevronRight } from 'lucide-react';

export default function Movies() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredMovies = useMemo(() => {
    return movies.filter(movie => {
      if (selectedLanguages.length > 0 && !movie.languages.some(lang => selectedLanguages.includes(lang))) {
        return false;
      }
      if (selectedGenres.length > 0 && !movie.genres.some(genre => selectedGenres.includes(genre))) {
        return false;
      }
      if (selectedFormats.length > 0 && !movie.format.some(format => selectedFormats.includes(format))) {
        return false;
      }
      return true;
    });
  }, [selectedLanguages, selectedGenres, selectedFormats]);

  const handleClearAll = () => {
    setSelectedLanguages([]);
    setSelectedGenres([]);
    setSelectedFormats([]);
    setSelectedDates([]);
    setSelectedCategories([]);
  };

  const selectedCity = localStorage.getItem('selectedCity') || 'Bhubaneswar';

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span>Home</span>
        <ChevronRight size={16} />
        <span className="text-gray-900 font-medium">Movies in {selectedCity}</span>
      </div>

      {/* Language Filter Row */}
      <div className="mb-6 pb-4 border-b">
        <h2 className="text-2xl font-bold mb-4">Movies in {selectedCity}</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {allLanguages.map(language => (
            <button
              key={language}
              onClick={() => {
                if (selectedLanguages.includes(language)) {
                  setSelectedLanguages(selectedLanguages.filter(l => l !== language));
                } else {
                  setSelectedLanguages([...selectedLanguages, language]);
                }
              }}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                selectedLanguages.includes(language)
                  ? 'bg-rose-600 border-rose-600 text-white'
                  : 'border-rose-600 text-rose-600 hover:bg-rose-50'
              }`}
            >
              {language}
            </button>
          ))}
          {selectedLanguages.length > 0 && (
            <button
              onClick={() => setSelectedLanguages([])}
              className="text-rose-600 text-sm hover:underline ml-2"
            >
              Clear
            </button>
          )}
        </div>
      </div>

      {/* Featured Movies Carousel */}
      <div className="mb-8">
        <Carousel title="Coming Soon">
          {movies.map(movie => (
            <div key={movie.id} className="px-2">
              <MovieCard movie={movie} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar
            type="movies"
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

        {/* Movies Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {filteredMovies.length} {filteredMovies.length === 1 ? 'Movie' : 'Movies'}
            </h3>
            <button className="lg:hidden px-4 py-2 border border-rose-600 text-rose-600 rounded-md hover:bg-rose-50 transition">
              Filters
            </button>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 xl:grid-cols-5 gap-4">
            {filteredMovies.map(movie => (
              <MovieCard key={movie.id} movie={movie} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}