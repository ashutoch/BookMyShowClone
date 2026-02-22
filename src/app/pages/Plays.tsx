import { useState, useMemo } from 'react';
import { EventCard } from '../components/EventCard';
import { Carousel } from '../components/Carousel';
import { plays, playCategories } from '../data/moviesData';
import { ChevronRight } from 'lucide-react';

export default function Plays() {
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedLanguages, setSelectedLanguages] = useState<string[]>([]);

  const selectedCity = localStorage.getItem('selectedCity') || 'Bhubaneswar';

  const allLanguages = [...new Set(plays.flatMap(p => p.languages || []))].sort();

  const filteredPlays = useMemo(() => {
    return plays.filter(play => {
      if (selectedCategories.length > 0 && !selectedCategories.includes(play.category)) return false;
      if (selectedLanguages.length > 0 && !play.languages?.some(l => selectedLanguages.includes(l))) return false;
      return true;
    });
  }, [selectedCategories, selectedLanguages]);

  const toggleCategory = (cat: string) =>
    setSelectedCategories(prev =>
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );

  const toggleLanguage = (lang: string) =>
    setSelectedLanguages(prev =>
      prev.includes(lang) ? prev.filter(l => l !== lang) : [...prev, lang]
    );

  const clearAll = () => {
    setSelectedCategories([]);
    setSelectedLanguages([]);
  };

  const hasFilters = selectedCategories.length > 0 || selectedLanguages.length > 0;

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span>Home</span>
        <ChevronRight size={16} />
        <span className="text-gray-900 font-medium">Plays in {selectedCity}</span>
      </div>

      {/* Header */}
      <div className="mb-6 pb-4 border-b">
        <h2 className="text-2xl font-bold mb-4">Plays in {selectedCity}</h2>

        {/* Category filter pills */}
        <div className="flex flex-wrap items-center gap-2 mb-3">
          {playCategories.map(cat => (
            <button
              key={cat}
              onClick={() => toggleCategory(cat)}
              className={`px-4 py-2 rounded-full text-sm border transition ${
                selectedCategories.includes(cat)
                  ? 'bg-rose-600 border-rose-600 text-white'
                  : 'border-rose-600 text-rose-600 hover:bg-rose-50'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Language filter pills */}
        <div className="flex flex-wrap items-center gap-2">
          {allLanguages.map(lang => (
            <button
              key={lang}
              onClick={() => toggleLanguage(lang)}
              className={`px-3 py-1.5 rounded-full text-xs border transition ${
                selectedLanguages.includes(lang)
                  ? 'bg-gray-800 border-gray-800 text-white'
                  : 'border-gray-400 text-gray-600 hover:bg-gray-100'
              }`}
            >
              {lang}
            </button>
          ))}
          {hasFilters && (
            <button
              onClick={clearAll}
              className="text-rose-600 text-sm hover:underline ml-2"
            >
              Clear all
            </button>
          )}
        </div>
      </div>

      {/* Featured Carousel — always shows all plays */}
      <div className="mb-10">
        <Carousel title="Featured Plays">
          {plays.map(play => (
            <div key={play.id} className="px-2">
              <EventCard event={play as any} />
            </div>
          ))}
        </Carousel>
      </div>

      {/* Grid */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold">
          {filteredPlays.length} {filteredPlays.length === 1 ? 'Play' : 'Plays'}
          {hasFilters && <span className="text-gray-400 font-normal"> (filtered)</span>}
        </h3>
      </div>

      {filteredPlays.length === 0 ? (
        <div className="text-center py-20 text-gray-500">
          <p className="text-xl font-medium mb-2">No plays match your filters</p>
          <button onClick={clearAll} className="text-rose-600 hover:underline">Clear filters</button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {filteredPlays.map(play => (
            <EventCard key={play.id} event={play as any} />
          ))}
        </div>
      )}
    </div>
  );
}