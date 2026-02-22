import { ChevronDown, ChevronUp, X } from 'lucide-react';
import { useState } from 'react';
import { languages, genres, formats, dateFilters, eventCategories, sportCategories } from '../data/moviesData';

interface FilterSidebarProps {
  type: 'movies' | 'events' | 'sports' | 'plays';
  selectedLanguages: string[];
  selectedGenres: string[];
  selectedFormats: string[];
  selectedDates: string[];
  selectedCategories: string[];
  onLanguageChange: (languages: string[]) => void;
  onGenreChange: (genres: string[]) => void;
  onFormatChange: (formats: string[]) => void;
  onDateChange: (dates: string[]) => void;
  onCategoryChange: (categories: string[]) => void;
  onClearAll: () => void;
}

export function FilterSidebar({
  type,
  selectedLanguages,
  selectedGenres,
  selectedFormats,
  selectedDates,
  selectedCategories,
  onLanguageChange,
  onGenreChange,
  onFormatChange,
  onDateChange,
  onCategoryChange,
  onClearAll
}: FilterSidebarProps) {
  const [expandedSections, setExpandedSections] = useState({
    languages: true,
    genres: true,
    formats: true,
    date: true,
    categories: true,
    price: false,
    moreFilters: false
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleLanguage = (language: string) => {
    if (selectedLanguages.includes(language)) {
      onLanguageChange(selectedLanguages.filter(l => l !== language));
    } else {
      onLanguageChange([...selectedLanguages, language]);
    }
  };

  const toggleGenre = (genre: string) => {
    if (selectedGenres.includes(genre)) {
      onGenreChange(selectedGenres.filter(g => g !== genre));
    } else {
      onGenreChange([...selectedGenres, genre]);
    }
  };

  const toggleFormat = (format: string) => {
    if (selectedFormats.includes(format)) {
      onFormatChange(selectedFormats.filter(f => f !== format));
    } else {
      onFormatChange([...selectedFormats, format]);
    }
  };

  const toggleDate = (date: string) => {
    if (selectedDates.includes(date)) {
      onDateChange(selectedDates.filter(d => d !== date));
    } else {
      onDateChange([...selectedDates, date]);
    }
  };

  const toggleCategory = (category: string) => {
    if (selectedCategories.includes(category)) {
      onCategoryChange(selectedCategories.filter(c => c !== category));
    } else {
      onCategoryChange([...selectedCategories, category]);
    }
  };

  const categories = type === 'events' || type === 'plays' ? eventCategories : sportCategories;

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 sticky top-24 max-h-[calc(100vh-120px)] overflow-y-auto">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-semibold text-lg">Filters</h3>
        <button 
          onClick={onClearAll}
          className="text-rose-600 text-sm hover:underline"
        >
          Clear All
        </button>
      </div>

      {/* Date Filter (for events and sports) */}
      {(type === 'events' || type === 'sports' || type === 'plays') && (
        <div className="mb-4 border-b pb-4">
          <button
            onClick={() => toggleSection('date')}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="text-rose-600 font-medium">Date</span>
            {expandedSections.date ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
          </button>
          {expandedSections.date && (
            <div className="space-y-2">
              {dateFilters.map(date => (
                <button
                  key={date}
                  onClick={() => toggleDate(date)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    selectedDates.includes(date)
                      ? 'bg-rose-100 border-rose-600 text-rose-600'
                      : 'border-gray-300 text-gray-700 hover:border-rose-600'
                  }`}
                >
                  {date}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Languages */}
      {type === 'movies' && (
        <div className="mb-4 border-b pb-4">
          <button
            onClick={() => toggleSection('languages')}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="text-rose-600 font-medium">Languages</span>
            {expandedSections.languages ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
          </button>
          {expandedSections.languages && (
            <div className="flex flex-wrap gap-2">
              {languages.map(language => (
                <button
                  key={language}
                  onClick={() => toggleLanguage(language)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    selectedLanguages.includes(language)
                      ? 'bg-rose-100 border-rose-600 text-rose-600'
                      : 'border-gray-300 text-gray-700 hover:border-rose-600'
                  }`}
                >
                  {language}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Categories (for events and sports) */}
      {(type === 'events' || type === 'sports' || type === 'plays') && (
        <div className="mb-4 border-b pb-4">
          <button
            onClick={() => toggleSection('categories')}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="text-rose-600 font-medium">Categories</span>
            {expandedSections.categories ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
          </button>
          {expandedSections.categories && (
            <div className="flex flex-wrap gap-2">
              {categories.map(category => (
                <button
                  key={category}
                  onClick={() => toggleCategory(category)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    selectedCategories.includes(category)
                      ? 'bg-rose-100 border-rose-600 text-rose-600'
                      : 'border-gray-300 text-gray-700 hover:border-rose-600'
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Genres (for movies only) */}
      {type === 'movies' && (
        <div className="mb-4 border-b pb-4">
          <button
            onClick={() => toggleSection('genres')}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="text-rose-600 font-medium">Genres</span>
            {expandedSections.genres ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
          </button>
          {expandedSections.genres && (
            <div className="flex flex-wrap gap-2">
              {genres.map(genre => (
                <button
                  key={genre}
                  onClick={() => toggleGenre(genre)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    selectedGenres.includes(genre)
                      ? 'bg-rose-100 border-rose-600 text-rose-600'
                      : 'border-gray-300 text-gray-700 hover:border-rose-600'
                  }`}
                >
                  {genre}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Format (for movies only) */}
      {type === 'movies' && (
        <div className="mb-4 border-b pb-4">
          <button
            onClick={() => toggleSection('formats')}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="text-rose-600 font-medium">Format</span>
            {expandedSections.formats ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
          </button>
          {expandedSections.formats && (
            <div className="flex flex-wrap gap-2">
              {formats.map(format => (
                <button
                  key={format}
                  onClick={() => toggleFormat(format)}
                  className={`px-3 py-1.5 rounded-full text-sm border transition ${
                    selectedFormats.includes(format)
                      ? 'bg-rose-100 border-rose-600 text-rose-600'
                      : 'border-gray-300 text-gray-700 hover:border-rose-600'
                  }`}
                >
                  {format}
                </button>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Price */}
      {type === 'movies' && (
        <div className="mb-4 border-b pb-4">
          <button
            onClick={() => toggleSection('price')}
            className="flex items-center justify-between w-full mb-3"
          >
            <span className="text-rose-600 font-medium">Price</span>
            {expandedSections.price ? <ChevronUp size={18} className="text-gray-500" /> : <ChevronDown size={18} className="text-gray-500" />}
          </button>
          {expandedSections.price && (
            <div className="space-y-2">
              <input
                type="range"
                min="0"
                max="1000"
                className="w-full accent-rose-600"
              />
              <div className="flex justify-between text-sm text-gray-600">
                <span>₹0</span>
                <span>₹1000+</span>
              </div>
            </div>
          )}
        </div>
      )}

      {type === 'movies' && (
        <button className="w-full py-2 border border-rose-600 text-rose-600 rounded-md hover:bg-rose-50 transition">
          Browse by Cinemas
        </button>
      )}
      {(type === 'events' || type === 'sports') && (
        <button className="w-full py-2 border border-rose-600 text-rose-600 rounded-md hover:bg-rose-50 transition">
          Browse by Venues
        </button>
      )}
    </div>
  );
}