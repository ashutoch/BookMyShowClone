import { movieImages } from './movieImages';
import Marathon from '../../assets/Marathon.jpg';
import Marathon2 from '../../assets/Marathon2.jpg';
import Marathon3 from '../../assets/Marathon3.jpg';
import Marathon4 from '../../assets/Marathon4.jpg';
import Kabaddi from '../../assets/Kabaddi.jpg';
import ISL from '../../assets/ISL.jpg';

export interface Movie {
  id: string;
  title: string;
  rating: number;
  votes: string;
  languages: string[];
  genres: string[];
  format: string[];
  imageUrl: string;
  duration: string;
  releaseDate: string;
  description: string;
  price: number;
}

export interface Event {
  id: string;
  title: string;
  venue: string;
  date: string;
  price: number;
  category: string;
  imageUrl: string;
  languages?: string[];
}

export interface Sport {
  id: string;
  title: string;
  venue: string;
  date: string;
  price: number;
  category: string;
  imageUrl: string;
}

export const cities = [
  'Bhubaneswar',
  'Rourkela',
  'Sambalpur',
  'Cuttack',
  'Berhampur',
  'Puri',
  'Balasore',
  'Bhadrak',
  'Baripada',
  'Jharsuguda'
];

export const languages = [
  'Kannada',
  'English',
  'Hindi',
  'Tamil',
  'Telugu',
  'Malayalam',
  'Marathi',
  'Odia',
  'Bengali',
  'Punjabi'
];

export const genres = [
  'Action',
  'Adventure',
  'Comedy',
  'Drama',
  'Horror',
  'Thriller',
  'Sci-Fi',
  'Romance',
  'Animation',
  'Fantasy'
];

export const formats = [
  '2D',
  '3D',
  'IMAX',
  '4DX',
  'IMAX 3D'
];

export const movies: Movie[] = [
  {
    id: '1',
    title: 'Deadpool & Wolverine',
    rating: 9.1,
    votes: '245K',
    languages: ['English', 'Hindi'],
    genres: ['Action', 'Comedy', 'Adventure'],
    format: ['2D', '3D', 'IMAX'],
    imageUrl: movieImages.deadpool,
    duration: '2h 8m',
    releaseDate: '2024-07-26',
    description: 'Deadpool teams up with Wolverine for an epic adventure.',
    price: 250
  },
  {
    id: '2',
    title: 'Pirates of the Caribbean',
    rating: 8.9,
    votes: '189K',
    languages: ['English', 'Hindi', 'Tamil'],
    genres: ['Action', 'Adventure', 'Fantasy'],
    format: ['2D', '3D', 'IMAX 3D'],
    imageUrl: movieImages.pirates,
    duration: '2h 23m',
    releaseDate: '2024-05-15',
    description: 'Captain Jack Sparrow returns for another high-seas adventure.',
    price: 280
  },
  {
    id: '3',
    title: 'The Fall Guy',
    rating: 8.5,
    votes: '123K',
    languages: ['English', 'Hindi'],
    genres: ['Action', 'Comedy', 'Thriller'],
    format: ['2D', '3D'],
    imageUrl: movieImages.fallGuy,
    duration: '2h 6m',
    releaseDate: '2024-05-03',
    description: 'A stuntman\'s world is turned upside down when a conspiracy unfolds.',
    price: 230
  },
  {
    id: '4',
    title: 'Avengers: Secret Wars',
    rating: 9.3,
    votes: '312K',
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    genres: ['Action', 'Sci-Fi', 'Adventure'],
    format: ['2D', '3D', 'IMAX', 'IMAX 3D', '4DX'],
    imageUrl: 'https://images.unsplash.com/photo-1657558045738-21507cf53606?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhdmVuZ2VycyUyMG1hcnZlbCUyMHN1cGVyaGVyb3xlbnwxfHx8fDE3NzE0MTU0MjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '2h 45m',
    releaseDate: '2024-05-01',
    description: 'The Avengers face their biggest threat yet in this epic conclusion.',
    price: 350
  },
  {
    id: '5',
    title: 'Spider-Man: Beyond',
    rating: 8.8,
    votes: '198K',
    languages: ['English', 'Hindi', 'Tamil'],
    genres: ['Action', 'Adventure', 'Sci-Fi'],
    format: ['2D', '3D', 'IMAX 3D'],
    imageUrl: 'https://images.unsplash.com/photo-1760954185931-40d5b65fbb86?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzcGlkZXJtYW4lMjBzdXBlcmhlcm8lMjBhY3Rpb248ZW58MXx8fHwxNzcxNDE1NDIyfDA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '2h 18m',
    releaseDate: '2024-06-12',
    description: 'Spider-Man swings into a new multiverse adventure.',
    price: 270
  },
  {
    id: '6',
    title: 'Guardians of the Galaxy Vol. 4',
    rating: 8.7,
    votes: '176K',
    languages: ['English', 'Hindi'],
    genres: ['Action', 'Comedy', 'Sci-Fi'],
    format: ['2D', '3D', 'IMAX'],
    imageUrl: 'https://images.unsplash.com/photo-1700864047038-23a5f3660ac8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWFyZGlhbnMlMjBnYWxheHklMjBzcGFjZXxlbnwxfHx8fDE3NzE0MTU0MjJ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    duration: '2h 12m',
    releaseDate: '2024-07-18',
    description: 'The Guardians embark on a cosmic journey to save the universe.',
    price: 260
  },
  {
    id: '7',
    title: 'Doctor Strange: Multiverse of Magic',
    rating: 8.6,
    votes: '154K',
    languages: ['English', 'Hindi', 'Tamil', 'Telugu'],
    genres: ['Action', 'Fantasy', 'Adventure'],
    format: ['2D', '3D', 'IMAX', '4DX'],
    imageUrl: movieImages.doctorStrange,
    duration: '2h 26m',
    releaseDate: '2024-04-20',
    description: 'Doctor Strange ventures into the magical multiverse.',
    price: 290
  },
  {
    id: '8',
    title: 'Thor: Legend Reborn',
    rating: 8.4,
    votes: '142K',
    languages: ['English', 'Hindi'],
    genres: ['Action', 'Fantasy', 'Comedy'],
    format: ['2D', '3D', 'IMAX'],
    imageUrl: movieImages.thor,
    duration: '2h 15m',
    releaseDate: '2024-08-09',
    description: 'Thor faces a new legendary challenge in Asgard.',
    price: 240
  }
];

export const events: Event[] = [
  {
    id: 'e1',
    title: 'Comedy Night@Brigade Road',
    venue: 'Just BLR: Bhubaneswar',
    date: 'Wed, 18 Feb onwards',
    price: 100,
    category: 'Comedy Shows',
    imageUrl: 'https://images.unsplash.com/photo-1643888395130-4cb09f9814d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBuaWdodCUyMHN0YW5kJTIwdXB8ZW58MXx8fHwxNzcxNDE1NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080',
    languages: ['English', 'Hindi']
  },
  {
    id: 'e2',
    title: 'OVERSMARTGIRI by Aditya Gundeti',
    venue: 'The Underground Comedy Club',
    date: 'Sun, 12 Apr',
    price: 499,
    category: 'Stand up Comedy',
    imageUrl: 'https://images.unsplash.com/photo-1643888395130-4cb09f9814d8?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb21lZHklMjBuaWdodCUyMHN0YW5kJTIwdXB8ZW58MXx8fHwxNzcxNDE1NDIzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'e3',
    title: 'Saturday Kannada and Hindi Live Jamming',
    venue: 'Silaa The Garden Cafe',
    date: 'Sat, 21 Feb',
    price: 399,
    category: 'Concerts',
    imageUrl: 'https://images.unsplash.com/photo-1568215425379-7a994872739d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBjb25jZXJ0JTIwc3RhZ2V8ZW58MXx8fHwxNzcxNDE0MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'e4',
    title: 'SHAAN LIVE IN BENGALURU',
    venue: 'Phoenix Market City',
    date: 'Sat, 4 Apr',
    price: 699,
    category: 'Concerts',
    imageUrl: 'https://images.unsplash.com/photo-1568215425379-7a994872739d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsaXZlJTIwbXVzaWMlMjBjb25jZXJ0JTIwc3RhZ2V8ZW58MXx8fHwxNzcxNDE0MjIwfDA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'e5',
    title: 'Macbeth: What\'s Done is Done',
    venue: 'Ranga Shankara',
    date: 'Sun, 15 Mar',
    price: 350,
    category: 'Theatre',
    imageUrl: 'https://images.unsplash.com/photo-1764763180662-e4791157a87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdHJlJTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzE0MDg1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  },
  {
    id: 'e6',
    title: 'HUMARE RAM Ft',
    venue: 'Jagriti Theatre',
    date: 'Fri, 27 Feb onwards',
    price: 400,
    category: 'Theatre',
    imageUrl: 'https://images.unsplash.com/photo-1764763180662-e4791157a87f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0aGVhdHJlJTIwc3RhZ2UlMjBwZXJmb3JtYW5jZXxlbnwxfHx8fDE3NzE0MDg1NDJ8MA&ixlib=rb-4.1.0&q=80&w=1080'
  }
];

export const sports: Sport[] = [
  {
    id: 's1',
    title: 'Miles for Smiles Run',
    venue: 'Defence Colony Cricket Club',
    date: 'Sun, 22 Feb',
    price: 229,
    category: 'Running',
    imageUrl: Marathon
  },
  {
    id: 's2',
    title: 'The Sistra Run - Bengaluru',
    venue: 'Orion Mall, Rajajinagar',
    date: 'Sun, 8 Mar',
    price: 0,
    category: 'Running',
    imageUrl: Marathon2
  },
  {
    id: 's3',
    title: 'Walk - Jog - RunInRed For Women\'s Health',
    venue: 'Maharani Lakshmi...',
    date: 'Sun, 8 Mar',
    price: 0,
    category: 'Marathon',
    imageUrl: Marathon3
  },
  {
    id: 's4',
    title: 'Six Yard Run',
    venue: 'Bhartiya Mall Of Bengaluru',
    date: 'Sun, 8 Mar',
    price: 499,
    category: 'Marathon',
    imageUrl: Marathon4
  },
  {
    id: 's5',
    title: 'Pro Kabaddi League 2024',
    venue: 'Kalinga Stadium, Bhubaneswar',
    date: 'Sat, 15 Mar',
    price: 399,
    category: 'Kabaddi',
    imageUrl: Kabaddi
  },
  {
    id: 's6',
    title: 'ISL Football Championship',
    venue: 'Barabati Stadium, Cuttack',
    date: 'Sun, 23 Mar',
    price: 299,
    category: 'Football',
    imageUrl: ISL
  }
];

export const theatres = [
  {
    id: 't1',
    name: 'INOX: Bhubaneswar',
    location: 'DN Regalia Mall, Chandrasekharpur',
    shows: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM', '11:00 PM']
  },
  {
    id: 't2',
    name: 'Cinepolis: Esplanade One',
    location: 'Rasulgarh, Bhubaneswar',
    shows: ['9:30 AM', '12:45 PM', '4:15 PM', '7:45 PM', '10:30 PM']
  },
  {
    id: 't3',
    name: 'PVR Cinemas: Rourkela',
    location: 'City Centre Mall, Rourkela',
    shows: ['10:30 AM', '2:00 PM', '5:30 PM', '9:00 PM']
  },
  {
    id: 't4',
    name: 'Carnival Cinemas: Sambalpur',
    location: 'V Square Mall, Sambalpur',
    shows: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM']
  }
];

export const eventCategories = [
  'Workshops',
  'Music Shows',
  'Comedy Shows',
  'Meetups',
  'Kids',
  'Performances',
  'Exhibitions',
  'Screening',
  'Conferences'
];

export const sportCategories = [
  'Cricket',
  'Running',
  'Chess',
  'Motorsports',
  'Card Games',
  'Basketball',
  'Cycling',
  'Mixed Martial Arts',
  'Shooting'
];

export const dateFilters = [
  'Today',
  'Tomorrow',
  'This Weekend'
];