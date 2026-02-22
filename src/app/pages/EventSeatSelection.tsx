import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router';
import { events } from '../data/moviesData';
import { storage } from '../utils/storage';

export default function EventSeatSelection() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [selectedSeats, setSelectedSeats] = useState<string[]>([]);
  const [bookedSeats, setBookedSeats] = useState<string[]>([]);

  const event = events.find(e => e.id === id);
  const currentBooking = storage.getCurrentBooking();

  useEffect(() => {
    if (!event || !currentBooking) {
      navigate('/events');
      return;
    }

    // Load booked seats from storage
    const seats = storage.getSeats(id!);
    setBookedSeats(seats);
  }, [event, currentBooking, id, navigate]);

  const rows = ['A', 'B', 'C', 'D', 'E'];
  const seatsPerRow = 10;

  const handleSeatClick = (seat: string) => {
    if (bookedSeats.includes(seat)) return;

    if (selectedSeats.includes(seat)) {
      setSelectedSeats(selectedSeats.filter(s => s !== seat));
    } else {
      if (selectedSeats.length >= 6) {
        alert('Maximum 6 seats can be selected');
        return;
      }
      setSelectedSeats([...selectedSeats, seat]);
    }
  };

  const getSeatStatus = (seat: string) => {
    if (bookedSeats.includes(seat)) return 'booked';
    if (selectedSeats.includes(seat)) return 'selected';
    return 'available';
  };

  const getSeatColor = (seat: string) => {
    const status = getSeatStatus(seat);
    if (status === 'booked') return 'bg-red-500 cursor-not-allowed';
    if (status === 'selected') return 'bg-yellow-400 hover:bg-yellow-500';
    return 'bg-green-500 hover:bg-green-600';
  };

  const handleContinue = () => {
    if (selectedSeats.length === 0) {
      alert('Please select at least one seat');
      return;
    }

    const ticketPrice = event!.price;
    const numberOfSeats = selectedSeats.length;
    const ticketsTotal = ticketPrice * numberOfSeats;
    const convenienceFee = numberOfSeats * 50;
    const grandTotal = ticketsTotal + convenienceFee;

    const updatedBooking = {
      ...currentBooking!,
      seats: selectedSeats,
      numberOfSeats,
      ticketPrice,
      ticketsTotal,
      convenienceFee,
      grandTotal,
      bookingId: `BMS${Date.now()}`,
      bookingDate: new Date().toLocaleDateString('en-IN', {
        day: 'numeric',
        month: 'short',
        year: 'numeric'
      })
    };

    // Save booking
    storage.setConfirmedBooking(updatedBooking);
    storage.addBooking(updatedBooking);

    // Update booked seats
    const updatedBookedSeats = [...bookedSeats, ...selectedSeats];
    storage.setSeats(id!, updatedBookedSeats);

    // Clear current booking
    storage.clearCurrentBooking();

    navigate('/booking-confirmation');
  };

  if (!event || !currentBooking) return null;

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-6 text-center">{event.title}</h1>
        <p className="text-center text-gray-600 mb-8">
          {currentBooking.date} | {currentBooking.showTime} | {currentBooking.venue}
        </p>

        {/* Screen */}
        <div className="mb-12">
          <div className="w-full max-w-2xl mx-auto">
            <div className="bg-gray-200 h-2 mb-4 rounded-full shadow-inner"></div>
            <p className="text-center text-gray-500 text-sm">STAGE</p>
          </div>
        </div>

        {/* Seat Grid */}
        <div className="bg-white rounded-lg p-8 mb-8 shadow-sm">
          <div className="space-y-4">
            {rows.map(row => (
              <div key={row} className="flex items-center gap-2">
                <span className="w-8 font-semibold text-gray-700">{row}</span>
                <div className="flex-1 flex justify-center gap-2">
                  {Array.from({ length: seatsPerRow }, (_, i) => {
                    const seatNumber = `${row}${i + 1}`;
                    return (
                      <button
                        key={seatNumber}
                        onClick={() => handleSeatClick(seatNumber)}
                        disabled={bookedSeats.includes(seatNumber)}
                        className={`w-10 h-10 rounded-md transition-all ${getSeatColor(
                          seatNumber
                        )} text-white text-xs font-semibold`}
                      >
                        {i + 1}
                      </button>
                    );
                  })}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Legend */}
        <div className="flex justify-center gap-8 mb-8 flex-wrap">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-green-500 rounded-md"></div>
            <span className="text-sm text-gray-700">Available</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-yellow-400 rounded-md"></div>
            <span className="text-sm text-gray-700">Selected</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-red-500 rounded-md"></div>
            <span className="text-sm text-gray-700">Booked</span>
          </div>
        </div>

        {/* Selected Seats & Price */}
        {selectedSeats.length > 0 && (
          <div className="bg-white rounded-lg p-6 shadow-sm mb-6">
            <div className="flex justify-between items-center mb-4">
              <div>
                <p className="text-gray-600">Selected Seats:</p>
                <p className="font-semibold text-lg">{selectedSeats.join(', ')}</p>
              </div>
              <div className="text-right">
                <p className="text-gray-600">Total Amount:</p>
                <p className="font-bold text-2xl text-rose-600">
                  ₹{event.price * selectedSeats.length + selectedSeats.length * 50}
                </p>
              </div>
            </div>
            <button
              onClick={handleContinue}
              className="w-full py-3 bg-rose-600 text-white rounded-lg font-semibold hover:bg-rose-700 transition"
            >
              Proceed to Pay
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
