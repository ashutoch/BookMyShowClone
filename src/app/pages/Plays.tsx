import { useState, useMemo } from 'react';
import { FilterSidebar } from '../components/FilterSidebar';
import { EventCard } from '../components/EventCard';
import { Carousel } from '../components/Carousel';
import { events } from '../data/moviesData';
import { ChevronRight } from 'lucide-react';

export default function Plays() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const plays = events.filter(e => e.category === 'Theatre');

  const filteredPlays = useMemo(() => {
    return plays.filter(play => {
      if (selectedLanguages.length > 0 && play.languages && !play.languages.some(lang => selectedLanguages.includes(lang))) {
        return false;
      }
      return true;
    });
  }, [selectedLanguages, plays]);

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
        <span className="text-gray-900 font-medium">Plays in {selectedCity}</span>
      </div>

      <h2 className="text-2xl font-bold mb-6">Plays in {selectedCity}</h2>

      {/* Featured Plays Carousel */}
      <div className="mb-8">
        <Carousel title="Featured Plays">
          {plays.map(play => (
            <div key={play.id} className="px-2">
              <EventCard event={play} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar
            type="plays"
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

        {/* Plays Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {filteredPlays.length} {filteredPlays.length === 1 ? 'Play' : 'Plays'}
            </h3>
            <button className="lg:hidden px-4 py-2 border border-rose-600 text-rose-600 rounded-md hover:bg-rose-50 transition">
              Filters
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPlays.map(play => (
              <EventCard key={play.id} event={play} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
