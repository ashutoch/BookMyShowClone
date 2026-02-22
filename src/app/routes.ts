import { createBrowserRouter } from "react-router";
import Root from "./pages/Root";
import Home from "./pages/Home";
import Movies from "./pages/Movies";
import Events from "./pages/Events";
import Sports from "./pages/Sports";
import Plays from "./pages/Plays";
import Activities from "./pages/Activities";
import MovieBooking from "./pages/MovieBooking";
import SeatSelection from "./pages/SeatSelection";
import BookingConfirmation from "./pages/BookingConfirmation";
import SignIn from "./pages/SignIn";
import MyBookings from "./pages/MyBookings";
import SearchResults from "./pages/SearchResults";
import EventBooking from "./pages/EventBooking";
import EventSeatSelection from "./pages/EventSeatSelection";
import SportBooking from "./pages/SportBooking";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: Home },
      { path: "movies", Component: Movies },
      { path: "events", Component: Events },
      { path: "sports", Component: Sports },
      { path: "plays", Component: Plays },
      { path: "activities", Component: Activities },
      { path: "movie/:id", Component: MovieBooking },
      { path: "movie/:id/seats", Component: SeatSelection },
      { path: "event/:id", Component: EventBooking },
      { path: "event/:id/seats", Component: EventSeatSelection },
      { path: "sport/:id", Component: SportBooking },
      { path: "booking-confirmation", Component: BookingConfirmation },
      { path: "my-bookings", Component: MyBookings },
      { path: "search", Component: SearchResults },
    ],
  },
  {
    path: "/signin",
    Component: SignIn,
  },
]);