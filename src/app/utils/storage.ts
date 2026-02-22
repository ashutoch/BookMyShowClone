export interface BookingData {
  movieId: string;
  movieTitle: string;
  movieImage: string;
  date: string;
  theatre?: string;
  theatreLocation?: string;
  showTime: string;
  price: number;
  seats?: string[];
  numberOfSeats?: number;
  ticketPrice?: number;
  ticketsTotal?: number;
  convenienceFee?: number;
  grandTotal?: number;
  bookingId?: string;
  bookingDate?: string;
}

export const storageKeys = {
  CURRENT_BOOKING: 'currentBooking',
  CONFIRMED_BOOKING: 'confirmedBooking',
  BOOKINGS: 'bookings',
  SELECTED_CITY: 'selectedCity',
  SEATS: (movieId: string) => `seats_${movieId}`
};

export const storage = {
  getCurrentBooking: (): BookingData | null => {
    const data = localStorage.getItem(storageKeys.CURRENT_BOOKING);
    return data ? JSON.parse(data) : null;
  },

  setCurrentBooking: (booking: BookingData) => {
    localStorage.setItem(storageKeys.CURRENT_BOOKING, JSON.stringify(booking));
  },

  getConfirmedBooking: (): BookingData | null => {
    const data = localStorage.getItem(storageKeys.CONFIRMED_BOOKING);
    return data ? JSON.parse(data) : null;
  },

  setConfirmedBooking: (booking: BookingData) => {
    localStorage.setItem(storageKeys.CONFIRMED_BOOKING, JSON.stringify(booking));
  },

  getAllBookings: (): BookingData[] => {
    const data = localStorage.getItem(storageKeys.BOOKINGS);
    return data ? JSON.parse(data) : [];
  },

  addBooking: (booking: BookingData) => {
    const bookings = storage.getAllBookings();
    bookings.push(booking);
    localStorage.setItem(storageKeys.BOOKINGS, JSON.stringify(bookings));
  },

  getSelectedCity: (): string => {
    return localStorage.getItem(storageKeys.SELECTED_CITY) || 'Bhubaneswar';
  },

  setSelectedCity: (city: string) => {
    localStorage.setItem(storageKeys.SELECTED_CITY, city);
  },

  getSeats: (movieId: string): any[] => {
    const data = localStorage.getItem(storageKeys.SEATS(movieId));
    return data ? JSON.parse(data) : [];
  },

  setSeats: (movieId: string, seats: any[]) => {
    localStorage.setItem(storageKeys.SEATS(movieId), JSON.stringify(seats));
  },

  clearCurrentBooking: () => {
    localStorage.removeItem(storageKeys.CURRENT_BOOKING);
  },

  clearConfirmedBooking: () => {
    localStorage.removeItem(storageKeys.CONFIRMED_BOOKING);
  }
};
