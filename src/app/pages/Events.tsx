import { useState, useMemo } from 'react';
import { FilterSidebar } from '../components/FilterSidebar';
import { EventCard } from '../components/EventCard';
import { Carousel } from '../components/Carousel';
import { events, eventCategories } from '../data/moviesData';
import { ChevronRight } from 'lucide-react';

export default function Events() {
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);
  const [selectedGenres, setSelectedGenres] = useState<string[]>([]);
  const [selectedFormats, setSelectedFormats] = useState<string[]>([]);
  const [selectedDates, setSelectedDates] = useState<string[]>([]);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  const filteredEvents = useMemo(() => {
    return events.filter(event => {
      if (selectedLanguages.length > 0 && event.languages && !event.languages.some(lang => selectedLanguages.includes(lang))) {
        return false;
      }
      if (selectedCategories.length > 0 && !selectedCategories.includes(event.category)) {
        return false;
      }
      return true;
    });
  }, [selectedLanguages, selectedCategories]);

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
        <span className="text-gray-900 font-medium">Events in {selectedCity}</span>
      </div>

      {/* Category Filter Row */}
      <div className="mb-6 pb-4 border-b">
        <h2 className="text-2xl font-bold mb-4">Events in {selectedCity}</h2>
        <div className="flex items-center gap-2 flex-wrap">
          {eventCategories.map(category => (
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

      {/* Featured Events Carousel */}
      <div className="mb-8">
        <Carousel title="Featured Events">
          {events.map(event => (
            <div key={event.id} className="px-2">
              <EventCard event={event} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Main Content */}
      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="hidden lg:block w-64 flex-shrink-0">
          <FilterSidebar
            type="events"
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

        {/* Events Grid */}
        <div className="flex-1">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-semibold">
              {filteredEvents.length} {filteredEvents.length === 1 ? 'Event' : 'Events'}
            </h3>
            <button className="lg:hidden px-4 py-2 border border-rose-600 text-rose-600 rounded-md hover:bg-rose-50 transition">
              Filters
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredEvents.map(event => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
