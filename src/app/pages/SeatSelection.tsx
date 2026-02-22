import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { ChevronRight, Info } from 'lucide-react';

interface Seat {
  id: string;
  row: string;
  number: number;
  status: 'available' | 'selected' | 'booked';
}

export default function SeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [seats, setSeats] = useState<Seat[]>([]);
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookingDetails, setBookingDetails] = useState<any>(null);

  const MAX_SEATS = 6;
  const ROWS = ['A', 'B', 'C', 'D', 'E'];
  const SEATS_PER_ROW = 10;
  const CONVENIENCE_FEE = 30;

  useEffect(() => {
    // Load booking details from localStorage
    const details = localStorage.getItem('currentBooking');
    if (details) {
      setBookingDetails(JSON.parse(details));
    } else {
      navigate(`/movie/${id}`);
      return;
    }

    // Initialize seats
    const storedSeats = localStorage.getItem(`seats_${id}`);
    let seatData: Seat[] = [];

    if (storedSeats) {
      seatData = JSON.parse(storedSeats);
    } else {
      // Generate seats
      for (let row of ROWS) {
        for (let i = 1; i <= SEATS_PER_ROW; i++) {
          seatData.push({
            id: `${row}${i}`,
            row,
            number: i,
            status: Math.random() > 0.7 ? 'booked' : 'available'
          });
        }
      }
      localStorage.setItem(`seats_${id}`, JSON.stringify(seatData));
    }

    setSeats(seatData);
  }, [id, navigate]);

  const handleSeatClick = (seatId: string) => {
    const seat = seats.find(s => s.id === seatId);
    if (!seat || seat.status === 'booked') return;

    if (seat.status === 'selected') {
      // Deselect seat
      setSelectedSeats(selectedSeats.filter(id => id !== seatId));
      setSeats(seats.map(s => 
        s.id === seatId ? { ...s, status: 'available' } : s
      ));
    } else {
      // Select seat
      if (selectedSeats.length >= MAX_SEATS) {
        alert(`You can only select up to ${MAX_SEATS} seats`);
        return;
      }
      setSelectedSeats([...selectedSeats, seatId]);
      setSeats(seats.map(s => 
        s.id === seatId ? { ...s, status: 'selected' } : s
      ));
    }
  };

  const calculateTotal = () => {
    const ticketPrice = bookingDetails?.price || 0;
    const ticketsTotal = ticketPrice * selectedSeats.length;
    const convenienceFeeTotal = CONVENIENCE_FEE * selectedSeats.length;
    return {
      ticketsTotal,
      convenienceFeeTotal,
      grandTotal: ticketsTotal + convenienceFeeTotal
    };
  };

  const handleProceed = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    const total = calculateTotal();
    const booking = {
      ...bookingDetails,
      seats: selectedSeats,
      numberOfSeats: selectedSeats.length,
      ticketPrice: bookingDetails.price,
      ticketsTotal: total.ticketsTotal,
      convenienceFee: total.convenienceFeeTotal,
      grandTotal: total.grandTotal,
      bookingId: `BMS${Date.now()}`,
      bookingDate: new Date().toISOString()
    };

    // Save booking
    const bookings = JSON.parse(localStorage.getItem('bookings') || '[]');
    bookings.push(booking);
    localStorage.setItem('bookings', JSON.stringify(bookings));

    // Update seat status to booked
    const updatedSeats = seats.map(seat => 
      selectedSeats.includes(seat.id) ? { ...seat, status: 'booked' as const } : seat
    );
    localStorage.setItem(`seats_${id}`, JSON.stringify(updatedSeats));

    // Store confirmed booking
    localStorage.setItem('confirmedBooking', JSON.stringify(booking));
    localStorage.removeItem('currentBooking');

    navigate('/booking-confirmation');
  };

  if (!bookingDetails) {
    return <div>Loading...</div>;
  }

  const total = calculateTotal();
  const seatsByRow = ROWS.map(row => seats.filter(s => s.row === row));

  return (
    <div className="min-h-screen bg-gray-50 pb-32">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-[1200px] mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 mb-3">
            <span>Home</span>
            <ChevronRight size={16} />
            <span>Movies</span>
            <ChevronRight size={16} />
            <span>{bookingDetails.movieTitle}</span>
            <ChevronRight size={16} />
            <span className="text-gray-900 font-medium">Select Seats</span>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold mb-1">{bookingDetails.movieTitle}</h1>
              <p className="text-gray-600">
                {bookingDetails.theatre} | {new Date(bookingDetails.date).toLocaleDateString('en-US', { 
                  weekday: 'short', 
                  month: 'short', 
                  day: 'numeric' 
                })} | {bookingDetails.showTime}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-gray-600">Selected Seats</p>
              <p className="text-2xl font-bold text-rose-600">{selectedSeats.length}/{MAX_SEATS}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Seat Map */}
      <div className="max-w-[1200px] mx-auto px-4 py-8">
        {/* Screen */}
        <div className="mb-12">
          <div className="w-full max-w-3xl mx-auto">
            <div className="bg-gray-200 h-2 rounded-t-full mb-2"></div>
            <p className="text-center text-gray-600 text-sm">All eyes this way please!</p>
          </div>
        </div>

        {/* Seats */}
        <div className="max-w-3xl mx-auto">
          {seatsByRow.map((rowSeats, idx) => (
            <div key={ROWS[idx]} className="flex items-center justify-center gap-2 mb-3">
              <span className="w-8 text-center font-semibold text-gray-600">{ROWS[idx]}</span>
              <div className="flex gap-2">
                {rowSeats.slice(0, 5).map(seat => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat.id)}
                    disabled={seat.status === 'booked'}
                    className={`w-8 h-8 rounded-t-lg text-xs font-medium transition-all ${
                      seat.status === 'available'
                        ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                        : seat.status === 'selected'
                        ? 'bg-yellow-400 text-gray-900 cursor-pointer'
                        : 'bg-red-500 text-white cursor-not-allowed opacity-60'
                    }`}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>
              <div className="w-8"></div>
              <div className="flex gap-2">
                {rowSeats.slice(5).map(seat => (
                  <button
                    key={seat.id}
                    onClick={() => handleSeatClick(seat.id)}
                    disabled={seat.status === 'booked'}
                    className={`w-8 h-8 rounded-t-lg text-xs font-medium transition-all ${
                      seat.status === 'available'
                        ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer'
                        : seat.status === 'selected'
                        ? 'bg-yellow-400 text-gray-900 cursor-pointer'
                        : 'bg-red-500 text-white cursor-not-allowed opacity-60'
                    }`}
                  >
                    {seat.number}
                  </button>
                ))}
              </div>
              <span className="w-8 text-center font-semibold text-gray-600">{ROWS[idx]}</span>
            </div>
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-6 mt-8 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-t-lg"></div>
            <span className="text-sm text-gray-700">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-400 rounded-t-lg"></div>
            <span className="text-sm text-gray-700">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded-t-lg opacity-60"></div>
            <span className="text-sm text-gray-700">Booked</span>
          </div>
        </div>

        {/* Note */}
        <div className="mt-8 max-w-3xl mx-auto bg-blue-50 border border-blue-200 rounded-lg p-4 flex gap-3">
          <Info size={20} className="text-blue-600 flex-shrink-0 mt-0.5" />
          <div className="text-sm text-gray-700">
            <p className="font-semibold mb-1">Please Note:</p>
            <ul className="list-disc list-inside space-y-1">
              <li>You can select a maximum of {MAX_SEATS} seats per booking</li>
              <li>Selected seats will be held for 10 minutes</li>
              <li>Convenience fee of ₹{CONVENIENCE_FEE} per ticket will be added</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      {selectedSeats.length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg z-40">
          <div className="max-w-[1200px] mx-auto px-4 py-4">
            <div className="flex items-center justify-between gap-4 flex-wrap">
              <div className="flex-1">
                <p className="text-sm text-gray-600 mb-1">
                  Selected Seats: <span className="font-semibold text-gray-900">{selectedSeats.join(', ')}</span>
                </p>
                <div className="flex items-center gap-4 text-sm">
                  <span>Tickets: ₹{total.ticketsTotal}</span>
                  <span>Convenience Fee: ₹{total.convenienceFeeTotal}</span>
                  <span className="font-bold text-lg text-rose-600">Total: ₹{total.grandTotal}</span>
                </div>
              </div>
              <button
                onClick={handleProceed}
                className="px-8 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition font-semibold text-lg"
              >
                Proceed to Pay
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
