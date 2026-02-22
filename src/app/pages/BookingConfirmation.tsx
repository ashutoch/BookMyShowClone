import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';
import { CheckCircle, Calendar, MapPin, Clock, Ticket, Download, Share2 } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

export default function BookingConfirmation() {
  const navigate = useNavigate();
  const [booking, setBooking] = useState<any>(null);

  useEffect(() => {
    const confirmedBooking = localStorage.getItem('confirmedBooking');
    if (confirmedBooking) {
      setBooking(JSON.parse(confirmedBooking));
    } else {
      navigate('/');
    }
  }, [navigate]);

  if (!booking) {
    return <div>Loading...</div>;
  }

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr);
    return date.toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    });
  };

  const handleDownload = () => {
    alert('Ticket download feature coming soon!');
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: 'Movie Booking Confirmation',
        text: `I've booked tickets for ${booking.movieTitle}!`,
      });
    } else {
      alert('Share feature not supported on this device');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Success Message */}
      <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white py-12">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <CheckCircle size={64} className="mx-auto mb-4" />
          <h1 className="text-4xl font-bold mb-2">Booking Confirmed!</h1>
          <p className="text-xl opacity-90">Your tickets have been booked successfully</p>
        </div>
      </div>

      {/* Booking Details */}
      <div className="max-w-[800px] mx-auto px-4 py-8">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Booking ID */}
          <div className="bg-rose-600 text-white px-6 py-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm opacity-90 mb-1">Booking ID</p>
                <p className="text-2xl font-bold">{booking.bookingId}</p>
              </div>
              <Ticket size={48} />
            </div>
          </div>

          {/* Movie Details */}
          <div className="p-6">
            <div className="flex gap-6 mb-6 pb-6 border-b">
              <div className="w-32 h-48 flex-shrink-0 rounded-lg overflow-hidden">
                <ImageWithFallback
                  src={booking.movieImage}
                  alt={booking.movieTitle}
                  fallbackSrc="https://via.placeholder.com/128x192"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h2 className="text-3xl font-bold mb-4">{booking.movieTitle}</h2>
                
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <Calendar size={20} className="text-rose-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="font-semibold">{formatDate(booking.date)}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <Clock size={20} className="text-rose-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Show Time</p>
                      <p className="font-semibold">{booking.showTime}</p>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <MapPin size={20} className="text-rose-600 mt-0.5" />
                    <div>
                      <p className="text-sm text-gray-600">Theatre</p>
                      <p className="font-semibold">{booking.theatre}</p>
                      <p className="text-sm text-gray-500">{booking.theatreLocation}</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Seat Details */}
            <div className="mb-6 pb-6 border-b">
              <h3 className="font-bold text-lg mb-3">Seat Details</h3>
              <div className="flex flex-wrap gap-2">
                {booking.seats?.map((seat: string) => (
                  <div
                    key={seat}
                    className="px-4 py-2 bg-rose-100 text-rose-700 rounded-lg font-semibold"
                  >
                    {seat}
                  </div>
                ))}
              </div>
              <p className="mt-3 text-gray-600">
                Total Seats: <span className="font-semibold text-gray-900">{booking.numberOfSeats}</span>
              </p>
            </div>

            {/* Payment Summary */}
            <div className="mb-6">
              <h3 className="font-bold text-lg mb-3">Payment Summary</h3>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">
                    Tickets ({booking.numberOfSeats} x ₹{booking.ticketPrice})
                  </span>
                  <span className="font-semibold">₹{booking.ticketsTotal}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-600">Convenience Fee</span>
                  <span className="font-semibold">₹{booking.convenienceFee}</span>
                </div>
                <div className="flex items-center justify-between pt-2 border-t-2 border-gray-200">
                  <span className="text-lg font-bold">Total Amount Paid</span>
                  <span className="text-2xl font-bold text-rose-600">₹{booking.grandTotal}</span>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 flex-wrap">
              <button
                onClick={handleDownload}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition font-semibold"
              >
                <Download size={20} />
                Download Ticket
              </button>
              <button
                onClick={handleShare}
                className="flex-1 min-w-[200px] flex items-center justify-center gap-2 px-6 py-3 border-2 border-rose-600 text-rose-600 rounded-lg hover:bg-rose-50 transition font-semibold"
              >
                <Share2 size={20} />
                Share
              </button>
            </div>
          </div>
        </div>

        {/* Important Info */}
        <div className="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-4">
          <h3 className="font-semibold text-blue-900 mb-2">Important Information</h3>
          <ul className="text-sm text-blue-800 space-y-1 list-disc list-inside">
            <li>Please carry a valid ID proof to the theatre</li>
            <li>Arrive at least 20 minutes before the show time</li>
            <li>No cancellations or refunds are allowed</li>
            <li>Screenshot this page or download the ticket for entry</li>
          </ul>
        </div>

        {/* Action Buttons */}
        <div className="mt-8 flex gap-4 flex-wrap justify-center">
          <button
            onClick={() => navigate('/movies')}
            className="px-8 py-3 bg-white border-2 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition font-semibold"
          >
            Browse More Movies
          </button>
          <button
            onClick={() => navigate('/')}
            className="px-8 py-3 bg-rose-600 text-white rounded-lg hover:bg-rose-700 transition font-semibold"
          >
            Back to Home
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="bg-gray-900 text-white py-8 mt-16">
        <div className="max-w-[800px] mx-auto px-4 text-center">
          <p className="text-gray-400">
            Thank you for choosing BookMyShow!
          </p>
          <p className="text-sm text-gray-500 mt-2">
            For any queries, contact us at support@bookmyshow.com
          </p>
        </div>
      </div>
    </div>
  );
}
