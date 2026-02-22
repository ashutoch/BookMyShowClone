import { ChevronRight } from 'lucide-react';

export default function Activities() {
  const selectedCity = localStorage.getItem('selectedCity') || 'Bhubaneswar';

  return (
    <div className="max-w-[1400px] mx-auto px-4 py-6">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-600 mb-4">
        <span>Home</span>
        <ChevronRight size={16} />
        <span className="text-gray-900 font-medium">Activities in {selectedCity}</span>
      </div>

      <div className="text-center py-20">
        <h2 className="text-3xl font-bold mb-4">Activities</h2>
        <p className="text-gray-600 text-lg">Coming Soon in {selectedCity}!</p>
        <p className="text-gray-500 mt-2">
          Explore workshops, classes, and other fun activities in your city.
        </p>
      </div>
    </div>
  );
}
