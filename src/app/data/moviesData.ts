import { movieImages } from './movieImages';
import Marathon from '../../assets/Marathon.jpg';
import Marathon2 from '../../assets/Marathon2.jpg';
import Marathon3 from '../../assets/Marathon3.jpg';
import Marathon4 from '../../assets/Marathon4.jpg';
import Kabaddi from '../../assets/Kabaddi.jpg';
import ISL from '../../assets/ISL.jpg';
import AdityaGundeti from '../../assets/Adiyta Gundeti.png';
import ComedyNight from '../../assets/Comedy.jpg';

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

export interface Play {
  id: string;
  title: string;
  venue: string;
  date: string;
  price: number;
  category: string;
  imageUrl: string;
  languages?: string[];
  duration?: string;
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

export interface Theatre {
  id: string;
  name: string;
  location: string;
  city: string;
  shows: string[];
}

export const cities = [
  'Bhubaneswar',
  'Cuttack',
  'Rourkela',
  'Sambalpur',
  'Berhampur',
  'Puri',
  'Balasore',
  'Bhadrak',
  'Baripada',
  'Jharsuguda',
  'Angul',
  'Dhenkanal',
  'Kendrapara',
  'Paradip',
  'Rayagada'
];

export const languages = [
  'Kannada', 'English', 'Hindi', 'Tamil', 'Telugu',
  'Malayalam', 'Marathi', 'Odia', 'Bengali', 'Punjabi'
];

export const genres = [
  'Action', 'Adventure', 'Comedy', 'Drama', 'Horror',
  'Thriller', 'Sci-Fi', 'Romance', 'Animation', 'Fantasy'
];

export const formats = ['2D', '3D', 'IMAX', '4DX', 'IMAX 3D'];

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
    description: "A stuntman's world is turned upside down when a conspiracy unfolds.",
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
  },
  {
    id: '9',
    title: 'Stree 2',
    rating: 9.0,
    votes: '287K',
    languages: ['Hindi'],
    genres: ['Horror', 'Comedy'],
    format: ['2D'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/a/a1/Stree_2.jpg',
    duration: '2h 15m',
    releaseDate: '2024-08-15',
    description: 'The terror of Stree returns to haunt Chanderi once more.',
    price: 220
  },
  {
    id: '10',
    title: 'Pushpa: The Rule',
    rating: 8.7,
    votes: '321K',
    languages: ['Telugu', 'Hindi', 'Tamil'],
    genres: ['Action', 'Drama', 'Thriller'],
    format: ['2D', '3D'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/1/11/Pushpa_2-_The_Rule.jpg',
    duration: '3h 20m',
    releaseDate: '2024-12-05',
    description: 'Pushpa Raj expands his empire while facing deadlier enemies.',
    price: 300
  },
  {
    id: '11',
    title: 'Kalki 2898 AD',
    rating: 8.3,
    votes: '198K',
    languages: ['Telugu', 'Hindi', 'Tamil', 'Malayalam'],
    genres: ['Sci-Fi', 'Action', 'Fantasy'],
    format: ['2D', '3D', 'IMAX'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/4/4c/Kalki_2898_AD.jpg',
    duration: '2h 58m',
    releaseDate: '2024-06-27',
    description: 'A futuristic sci-fi epic blending mythology and science fiction.',
    price: 320
  },
  {
    id: '12',
    title: 'Fighter',
    rating: 7.9,
    votes: '156K',
    languages: ['Hindi'],
    genres: ['Action', 'Drama'],
    format: ['2D', '3D', 'IMAX'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/df/Fighter_film_teaser.jpg',
    duration: '2h 46m',
    releaseDate: '2024-01-25',
    description: "India's first aerial action franchise featuring elite air force pilots.",
    price: 260
  },
  {
    id: '13',
    title: 'Animal',
    rating: 8.1,
    votes: '243K',
    languages: ['Hindi'],
    genres: ['Action', 'Drama', 'Thriller'],
    format: ['2D'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/9/90/Animal_%282023_film%29_poster.jpg',
    duration: '3h 21m',
    releaseDate: '2023-12-01',
    description: "A man goes to extreme lengths to win his father's love and respect.",
    price: 240
  },
  {
    id: '14',
    title: 'Inception',
    rating: 9.2,
    votes: '189K',
    languages: ['English', 'Hindi'],
    genres: ['Sci-Fi', 'Thriller', 'Action'],
    format: ['2D', '3D', 'IMAX', 'IMAX 3D'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/2/2e/Inception_%282010%29_theatrical_poster.jpg',
    duration: '2h 50m',
    releaseDate: '2024-07-16',
    description: "Dom Cobb's journey into the depths of the human mind.",
    price: 330
  },
  {
    id: '15',
    title: 'RRR',
    rating: 9.1,
    votes: '276K',
    languages: ['Telugu', 'Hindi', 'Tamil'],
    genres: ['Action', 'Drama', 'Adventure'],
    format: ['2D', '3D', 'IMAX'],
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/d/d7/RRR_Poster.jpg',
    duration: '3h 5m',
    releaseDate: '2025-01-26',
    description: 'The epic saga of Ram and Bheem continues in an even grander battle.',
    price: 310
  }
];

export const events: Event[] = [
  // ── Stand-up & Comedy ──
  {
    id: 'e1',
    title: 'Comedy Night Live',
    venue: 'Laughter Lounge, Bhubaneswar',
    date: 'Sat, 22 Feb',
    price: 299,
    category: 'Comedy Shows',
    imageUrl: ComedyNight,
    languages: ['Hindi', 'English']
  },
  {
    id: 'e2',
    title: 'OVERSMARTGIRI by Aditya Gundeti',
    venue: 'The Underground Comedy Club, Cuttack',
    date: 'Sun, 12 Apr',
    price: 499,
    category: 'Stand up Comedy',
    imageUrl: AdityaGundeti,
    languages: ['Hindi', 'Telugu']
  },
  {
    id: 'e3',
    title: 'Hasna Mat! - Stand Up Special',
    venue: 'Kalinga Cultural Hall, Bhubaneswar',
    date: 'Fri, 7 Mar',
    price: 399,
    category: 'Stand up Comedy',
    imageUrl: 'https://images.unsplash.com/photo-1585699324551-f6c309eedeca?w=800&q=80',
    languages: ['Hindi']
  },
  {
    id: 'e4',
    title: 'Zakir Khan Live - Bhubaneswar',
    venue: 'KIIT Stadium, Bhubaneswar',
    date: 'Sat, 29 Mar',
    price: 999,
    category: 'Stand up Comedy',
    imageUrl: 'https://images.unsplash.com/photo-1527224857830-43a7acc85260?w=800&q=80',
    languages: ['Hindi']
  },
  // ── Indian Dance ──
  {
    id: 'e5',
    title: 'Odissi Utsav 2026',
    venue: 'Rabindra Mandap, Bhubaneswar',
    date: 'Sun, 2 Mar',
    price: 250,
    category: 'Dance',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRVAtCkEA41oRoG58tVuCx8pBs0bjOAdgolog&s',
    languages: ['Odia']
  },
  {
    id: 'e6',
    title: 'Bollywood Dance Night',
    venue: 'Mayfair Convention, Bhubaneswar',
    date: 'Sat, 15 Mar',
    price: 599,
    category: 'Dance',
    imageUrl: 'https://images.unsplash.com/photo-1545959570-a94084071b5d?w=800&q=80',
    languages: ['Hindi']
  },
  {
    id: 'e7',
    title: 'Bharatanatyam Evening',
    venue: 'Utkal Sangeet Mahavidyalaya, Bhubaneswar',
    date: 'Sun, 23 Mar',
    price: 199,
    category: 'Dance',
    imageUrl: 'https://t3.ftcdn.net/jpg/03/65/13/52/360_F_365135250_D4slgOo8wAYADnqNvaMtR9hIu17ySXmV.jpg',
    languages: ['Tamil', 'Hindi']
  },
  {
    id: 'e8',
    title: 'Folk & Bollywood Extravaganza',
    venue: 'Barabati Stadium, Cuttack',
    date: 'Sat, 5 Apr',
    price: 449,
    category: 'Dance',
    imageUrl: 'https://images.unsplash.com/photo-1504609813442-a8924e83f76e?w=800&q=80',
    languages: ['Hindi', 'Odia']
  },
  // ── Concerts ──
  {
    id: 'e9',
    title: 'SHAAN Live in Bhubaneswar',
    venue: 'IDCO Exhibition Ground, Bhubaneswar',
    date: 'Sat, 4 Apr',
    price: 699,
    category: 'Concerts',
    imageUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZSI4gSh_SqzhKM3CHZcCIK_9J7tv49fR1lg&s',
    languages: ['Hindi']
  },
  {
    id: 'e10',
    title: 'Arijit Singh Live Concert',
    venue: 'Kalinga Stadium, Bhubaneswar',
    date: 'Sun, 20 Apr',
    price: 1499,
    category: 'Concerts',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    languages: ['Hindi', 'Bengali']
  },
  {
    id: 'e11',
    title: 'Jubin Nautiyal - Night of Music',
    venue: 'Binodini Open Air Theatre, Cuttack',
    date: 'Sat, 12 Apr',
    price: 849,
    category: 'Concerts',
    imageUrl: 'https://images.unsplash.com/photo-1540039155733-5bb30b53aa14?w=800&q=80',
    languages: ['Hindi']
  },
  {
    id: 'e12',
    title: 'A.R. Rahman Symphony',
    venue: 'KIIT Stadium, Bhubaneswar',
    date: 'Sat, 26 Apr',
    price: 1999,
    category: 'Concerts',
    imageUrl: 'https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?w=800&q=80',
    languages: ['Hindi', 'Tamil', 'English']
  }
]
export const plays: Play[] = [
  // ── Blockbuster Musicals ──
  {
    id: 'p1',
    title: 'Mughal-E-Azam: The Musical',
    venue: 'IDCO Convention Centre, Bhubaneswar',
    date: 'Sat, 22 Mar',
    price: 799,
    category: 'Musical',
    imageUrl: 'https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=800&q=80',
    languages: ['Hindi', 'Urdu'],
    duration: '2h 45m'
  },
  {
    id: 'p2',
    title: 'Ramayana: The Epic Musical',
    venue: 'KIIT Auditorium, Bhubaneswar',
    date: 'Sun, 6 Apr',
    price: 599,
    category: 'Musical',
    imageUrl: 'https://media.istockphoto.com/id/488380476/vector/rama-killing-ravana-in-happy-dussehra.jpg?s=612x612&w=0&k=20&c=xxOBHM6k8rO7qAn4lhwAOEMrmJuBe_K_I-lU8q4vVJc=',
    languages: ['Hindi', 'Sanskrit'],
    duration: '3h'
  },
  {
    id: 'p3',
    title: 'Disco Dancer - The Musical',
    venue: 'Mayfair Convention Centre, Bhubaneswar',
    date: 'Sat, 12 Apr',
    price: 499,
    category: 'Musical',
    imageUrl: 'https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&q=80',
    languages: ['Hindi'],
    duration: '2h 30m'
  },
  // ── Hit Hindi Plays ──
  {
    id: 'p4',
    title: 'Tumhari Amrita',
    venue: 'Rabindra Mandap, Bhubaneswar',
    date: 'Sun, 9 Mar',
    price: 349,
    category: 'Hindi Theatre',
    imageUrl: 'https://substackcdn.com/image/fetch/$s_!GZQn!,f_auto,q_auto:good,fl_progressive:steep/https%3A%2F%2Fsubstack-post-media.s3.amazonaws.com%2Fpublic%2Fimages%2F3c70b50a-9646-4ba2-89ca-7112ceec0030.heic',
    languages: ['Hindi'],
    duration: '1h 45m'
  },
  {
    id: 'p5',
    title: 'Andha Yug',
    venue: 'Utkal Rangamancha, Cuttack',
    date: 'Sat, 1 Mar',
    price: 299,
    category: 'Hindi Theatre',
    imageUrl: 'https://bahujanstore.com/public/assets/images/products/largeimg/1710871745_586098fc4ed0bfa0322e.jpg',
    languages: ['Hindi'],
    duration: '2h 15m'
  },
  {
    id: 'p6',
    title: 'Ek Ruka Hua Faisla',
    venue: 'Shilpa Kala Vedika, Bhubaneswar',
    date: 'Fri, 14 Mar',
    price: 249,
    category: 'Hindi Theatre',
    imageUrl: 'https://images.unsplash.com/photo-1503095396549-807759245b35?w=800&q=80',
    languages: ['Hindi'],
    duration: '2h'
  },
  {
    id: 'p7',
    title: 'Kahaani Ek Raaste Ki',
    venue: 'Kalinga Cultural Hall, Bhubaneswar',
    date: 'Sat, 29 Mar',
    price: 399,
    category: 'Hindi Theatre',
    imageUrl: 'https://media.istockphoto.com/id/1389125114/photo/light-trails-on-british-countryside-road-peak-district-uk.jpg?s=612x612&w=0&k=20&c=3v38ZLbevXjHMfbz7iZMwoJvh9kfpSla8aJpwz7dEac=',
    languages: ['Hindi'],
    duration: '2h'
  },
  // ── Dance Drama ──
  {
    id: 'p8',
    title: 'Devdas: A Dance Drama',
    venue: 'Rabindra Mandap, Bhubaneswar',
    date: 'Sat, 19 Apr',
    price: 349,
    category: 'Dance Drama',
    imageUrl: 'https://c8.alamy.com/comp/2JDPE5P/dixitkhanposter-devdas-2002-2JDPE5P.jpg',
    languages: ['Hindi'],
    duration: '2h'
  },
  {
    id: 'p9',
    title: 'Shakuntala - Classical Dance Drama',
    venue: 'Shilpa Kala Vedika, Bhubaneswar',
    date: 'Sun, 27 Apr',
    price: 249,
    category: 'Dance Drama',
    imageUrl: 'https://i.pinimg.com/564x/a1/0c/39/a10c39ff82960700d56b42e3b4e9ecbe.jpg',
    languages: ['Hindi', 'Sanskrit'],
    duration: '2h 15m'
  },
  // ── English Theatre ──
  {
    id: 'p10',
    title: "Macbeth",
    venue: 'Ranga Shankara, Bhubaneswar',
    date: 'Sun, 15 Mar',
    price: 399,
    category: 'English Theatre',
    imageUrl: 'https://images.unsplash.com/photo-1460723237483-7a6dc9d0b212?w=800&q=80',
    languages: ['English'],
    duration: '2h 10m'
  },
  {
    id: 'p11',
    title: "A Midsummer Night's Dream",
    venue: 'Alliance Française, Bhubaneswar',
    date: 'Sat, 29 Mar',
    price: 449,
    category: 'English Theatre',
    imageUrl: 'https://i.pinimg.com/474x/5b/ba/3c/5bba3cb765913f7f9efcac871cab57ce.jpg',
    languages: ['English'],
    duration: '2h 20m'
  },
  {
    id: 'p12',
    title: 'Death of a Salesman',
    venue: 'KIIT Auditorium, Bhubaneswar',
    date: 'Sat, 5 Apr',
    price: 499,
    category: 'English Theatre',
    imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/2/20/DeathOfASalesman.jpg/250px-DeathOfASalesman.jpg',
    languages: ['English'],
    duration: '2h 30m'
  },
  // ── Jatra (Traditional) ──
  {
    id: 'p13',
    title: 'Kansa Badha - Grand Jatra',
    venue: 'Barabati Stadium, Cuttack',
    date: 'Sat, 5 Apr',
    price: 99,
    category: 'Jatra',
    imageUrl: 'https://i.pinimg.com/736x/e2/3f/cd/e23fcdac3cfd971b1354e74dac813a8e.jpg',
    languages: ['Odia'],
    duration: '3h'
  },
  {
    id: 'p14',
    title: 'Sati Tulasi - Epic Jatra',
    venue: 'Baliyatra Ground, Cuttack',
    date: 'Sat, 19 Apr',
    price: 79,
    category: 'Jatra',
    imageUrl: 'https://media.istockphoto.com/id/1444504746/photo/flowering-sacred-tulsi-plant.jpg?s=612x612&w=0&k=20&c=aTl5BErUTkNe2tt_1Xmz0qQviygj3CuCFWTlmYUZf6A=',
    languages: ['Odia'],
    duration: '3h 30m'
  }
]
export const theatres: Theatre[] = [
  // ── Bhubaneswar ──
  {
    id: 't1',
    name: 'INOX: DN Regalia Mall',
    location: 'DN Regalia Mall, Chandrasekharpur',
    city: 'Bhubaneswar',
    shows: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM', '11:00 PM']
  },
  {
    id: 't2',
    name: 'Cinepolis: Esplanade One',
    location: 'Rasulgarh, Bhubaneswar',
    city: 'Bhubaneswar',
    shows: ['9:30 AM', '12:45 PM', '4:15 PM', '7:45 PM', '10:30 PM']
  },
  {
    id: 't3',
    name: 'PVR: Forum Mart',
    location: 'Forum Mart Mall, Rasulgarh',
    city: 'Bhubaneswar',
    shows: ['10:30 AM', '2:00 PM', '5:30 PM', '9:00 PM']
  },
  {
    id: 't4',
    name: 'Kalinga Talkies',
    location: 'Bapuji Nagar, Bhubaneswar',
    city: 'Bhubaneswar',
    shows: ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM']
  },
  // ── Cuttack ──
  {
    id: 't5',
    name: 'INOX: Madhupatna',
    location: 'Madhupatna, Cuttack',
    city: 'Cuttack',
    shows: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM']
  },
  {
    id: 't6',
    name: 'Swosti Cineplex',
    location: 'College Square, Cuttack',
    city: 'Cuttack',
    shows: ['9:30 AM', '12:30 PM', '3:30 PM', '6:30 PM', '9:30 PM']
  },
  {
    id: 't7',
    name: 'Urvashi Cinema Hall',
    location: 'Badambadi, Cuttack',
    city: 'Cuttack',
    shows: ['10:00 AM', '2:00 PM', '6:00 PM', '9:00 PM']
  },
  // ── Rourkela ──
  {
    id: 't8',
    name: 'PVR: City Centre Mall',
    location: 'City Centre Mall, Rourkela',
    city: 'Rourkela',
    shows: ['10:30 AM', '2:00 PM', '5:30 PM', '9:00 PM']
  },
  {
    id: 't9',
    name: 'INOX: Steel City',
    location: 'Udit Nagar, Rourkela',
    city: 'Rourkela',
    shows: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM']
  },
  {
    id: 't10',
    name: 'Jyoti Talkies',
    location: 'Rourkela Main Road',
    city: 'Rourkela',
    shows: ['11:00 AM', '3:00 PM', '7:00 PM', '10:00 PM']
  },
  // ── Sambalpur ──
  {
    id: 't11',
    name: 'Carnival Cinemas: V Square',
    location: 'V Square Mall, Sambalpur',
    city: 'Sambalpur',
    shows: ['11:00 AM', '2:30 PM', '6:00 PM', '9:30 PM']
  },
  {
    id: 't12',
    name: 'Sagar Cineplex',
    location: 'Ainthapali, Sambalpur',
    city: 'Sambalpur',
    shows: ['10:00 AM', '1:00 PM', '4:30 PM', '8:00 PM']
  },
  // ── Berhampur ──
  {
    id: 't13',
    name: 'INOX: Berhampur Mall',
    location: 'Berhampur Mall, Ganjam',
    city: 'Berhampur',
    shows: ['10:30 AM', '2:00 PM', '5:30 PM', '9:00 PM']
  },
  {
    id: 't14',
    name: 'Pushpagiri Cinema',
    location: 'Main Road, Berhampur',
    city: 'Berhampur',
    shows: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM']
  },
  // ── Puri ──
  {
    id: 't15',
    name: 'Puri Cineplex',
    location: 'Grand Road, Puri',
    city: 'Puri',
    shows: ['10:00 AM', '2:00 PM', '6:00 PM', '9:00 PM']
  },
  {
    id: 't16',
    name: 'Sea View Talkies',
    location: 'Marine Drive, Puri',
    city: 'Puri',
    shows: ['11:00 AM', '3:00 PM', '7:00 PM', '10:00 PM']
  },
  // ── Balasore ──
  {
    id: 't17',
    name: 'Carnival Cinemas: Balasore',
    location: 'Station Bazaar, Balasore',
    city: 'Balasore',
    shows: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM']
  },
  {
    id: 't18',
    name: 'Odeon Cinema',
    location: 'Sahadevkhunta, Balasore',
    city: 'Balasore',
    shows: ['10:30 AM', '2:30 PM', '6:30 PM', '9:30 PM']
  },
  // ── Bhadrak ──
  {
    id: 't19',
    name: 'Bhadrak Cineplex',
    location: 'Charampa, Bhadrak',
    city: 'Bhadrak',
    shows: ['10:00 AM', '2:00 PM', '6:00 PM', '9:00 PM']
  },
  // ── Baripada ──
  {
    id: 't20',
    name: 'Mayurbhanj Cinema',
    location: 'Town Square, Baripada',
    city: 'Baripada',
    shows: ['10:30 AM', '2:30 PM', '6:30 PM', '9:30 PM']
  },
  // ── Jharsuguda ──
  {
    id: 't21',
    name: 'City Cinemas: Jharsuguda',
    location: 'Nehru Nagar, Jharsuguda',
    city: 'Jharsuguda',
    shows: ['10:00 AM', '1:30 PM', '5:00 PM', '8:30 PM']
  },
  // ── Angul ──
  {
    id: 't22',
    name: 'Angul Multiplex',
    location: 'Bus Stand Road, Angul',
    city: 'Angul',
    shows: ['11:00 AM', '3:00 PM', '7:00 PM', '10:00 PM']
  },
  // ── Dhenkanal ──
  {
    id: 't23',
    name: 'Dhenkanal Cinema Hall',
    location: 'Main Market, Dhenkanal',
    city: 'Dhenkanal',
    shows: ['10:00 AM', '2:00 PM', '6:00 PM', '9:00 PM']
  },
  // ── Kendrapara ──
  {
    id: 't24',
    name: 'Kendrapara Cineplex',
    location: 'College Road, Kendrapara',
    city: 'Kendrapara',
    shows: ['10:30 AM', '2:30 PM', '6:30 PM', '9:30 PM']
  },
  // ── Paradip ──
  {
    id: 't25',
    name: 'Port City Cinema',
    location: 'Industrial Area, Paradip',
    city: 'Paradip',
    shows: ['10:00 AM', '2:00 PM', '6:00 PM', '9:00 PM']
  },
  // ── Rayagada ──
  {
    id: 't26',
    name: 'Rayagada Multiplex',
    location: 'Station Road, Rayagada',
    city: 'Rayagada',
    shows: ['11:00 AM', '3:00 PM', '7:00 PM', '10:00 PM']
  }
];

export const eventCategories = [
  'Comedy Shows', 'Stand up Comedy', 'Dance', 'Concerts',
  'Workshops', 'Music Shows', 'Meetups', 'Kids', 'Performances', 'Exhibitions'
];

export const playCategories = [
  'Hindi Theatre', 'Odia Theatre', 'English Theatre', 'Musical', 'Jatra', 'Dance Drama'
];

export const sportCategories = [
  'Cricket', 'Marathon', 'Running', 'Hiking', 'Kabaddi', 'Football',
  'Chess', 'Basketball', 'Cycling', 'Mixed Martial Arts',
  'Shooting', 'Motorsports', 'Card Games'
];

export const dateFilters = ['Today', 'Tomorrow', 'This Weekend'];

export const sports: Sport[] = [
  // ── Marathon ──
  {
    id: 's1',
    title: 'Tata Mumbai Marathon 2026',
    venue: 'Chhatrapati Shivaji Maharaj Terminus, Mumbai',
    date: 'Sun, 15 Mar',
    price: 999,
    category: 'Marathon',
    imageUrl: Marathon,
  },
  {
    id: 's2',
    title: 'Bhubaneswar Half Marathon',
    venue: 'Kalinga Stadium, Bhubaneswar',
    date: 'Sun, 23 Feb',
    price: 499,
    category: 'Marathon',
    imageUrl: Marathon2,
  },
  {
    id: 's3',
    title: 'Puri Beach Marathon',
    venue: 'Puri Sea Beach, Puri',
    date: 'Sat, 8 Mar',
    price: 399,
    category: 'Marathon',
    imageUrl: Marathon3,
  },
  {
    id: 's4',
    title: 'Vedanta Delhi Half Marathon',
    venue: 'Jawaharlal Nehru Stadium, New Delhi',
    date: 'Sun, 30 Mar',
    price: 799,
    category: 'Marathon',
    imageUrl: Marathon4,
  },
  // ── Running ──
  {
    id: 's5',
    title: 'Bhubaneswar 10K Run 2026',
    venue: 'Ekamra Haat, Bhubaneswar',
    date: 'Sat, 1 Mar',
    price: 299,
    category: 'Running',
    imageUrl: 'https://images.unsplash.com/photo-1552674605-db6ffd4facb5?w=800&q=80',
  },
  {
    id: 's6',
    title: 'Sunrise Run - Konark',
    venue: 'Konark Sun Temple, Puri',
    date: 'Sun, 9 Mar',
    price: 199,
    category: 'Running',
    imageUrl: 'https://images.unsplash.com/photo-1571008887538-b36bb32f4571?w=800&q=80',
  },
  {
    id: 's7',
    title: 'Night Run Bhubaneswar',
    venue: 'KIIT Campus, Bhubaneswar',
    date: 'Sat, 22 Mar',
    price: 349,
    category: 'Running',
    imageUrl: 'https://images.unsplash.com/photo-1506485338023-6ce5f36692df?w=800&q=80',
  },
  // ── Hiking ──
  {
    id: 's8',
    title: 'Nandankanan Nature Trek',
    venue: 'Nandankanan Zoological Park, Bhubaneswar',
    date: 'Sat, 1 Mar',
    price: 0,
    category: 'Hiking',
    imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=800&q=80',
  },
  {
    id: 's9',
    title: 'Deras Dam Trail Hike',
    venue: 'Deras Dam, Khordha',
    date: 'Sun, 16 Mar',
    price: 149,
    category: 'Hiking',
    imageUrl: 'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=800&q=80',
  },
  {
    id: 's10',
    title: 'Satkosia Gorge Trek',
    venue: 'Satkosia Tiger Reserve, Angul',
    date: 'Sat, 29 Mar',
    price: 599,
    category: 'Hiking',
    imageUrl: 'https://images.unsplash.com/photo-1508739773434-c26b3d09e071?w=800&q=80',
  },
  // ── Kabaddi ──
  {
    id: 's11',
    title: 'Pro Kabaddi League - Patna Pirates vs U Mumba',
    venue: 'Barabati Stadium, Cuttack',
    date: 'Fri, 28 Feb',
    price: 299,
    category: 'Kabaddi',
    imageUrl: Kabaddi,
  },
  {
    id: 's12',
    title: 'Odisha Kabaddi Championship',
    venue: 'Kalinga Stadium, Bhubaneswar',
    date: 'Sat, 15 Mar',
    price: 199,
    category: 'Kabaddi',
    imageUrl: Kabaddi,
  },
  // ── Cricket ──
  {
    id: 's13',
    title: 'IPL 2026: Sunrisers Hyderabad vs RCB',
    venue: 'Barabati Stadium, Cuttack',
    date: 'Sat, 5 Apr',
    price: 799,
    category: 'Cricket',
    imageUrl: 'https://i.pinimg.com/736x/2b/0a/e1/2b0ae13cd927906c72b4d09ebd09f52f.jpg',
  },
  {
    id: 's14',
    title: 'Ranji Trophy: Odisha vs Bengal',
    venue: 'DRIEMS Ground, Cuttack',
    date: 'Tue, 11 Mar',
    price: 99,
    category: 'Cricket',
    imageUrl: 'https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?w=800&q=80',
  },
  // ── Football ──
  {
    id: 's15',
    title: 'ISL 2025-26: Odisha FC vs Bengaluru FC',
    venue: 'Kalinga Stadium, Bhubaneswar',
    date: 'Sat, 1 Mar',
    price: 399,
    category: 'Football',
    imageUrl: ISL,
  },
  {
    id: 's16',
    title: 'Santosh Trophy: Odisha vs Goa',
    venue: 'KIIT Stadium, Bhubaneswar',
    date: 'Sun, 16 Mar',
    price: 149,
    category: 'Football',
    imageUrl: 'https://images.unsplash.com/photo-1579952363873-27f3bade9f55?w=800&q=80',
  },
  // ── Cycling ──
  {
    id: 's17',
    title: 'Bhubaneswar Cycling Festival 2026',
    venue: 'Raj Bhawan Road, Bhubaneswar',
    date: 'Sun, 2 Mar',
    price: 249,
    category: 'Cycling',
    imageUrl: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&q=80',
  },
  {
    id: 's18',
    title: 'Tour de Odisha - Stage Race',
    venue: 'Puri - Bhubaneswar Highway',
    date: 'Sat, 12 Apr',
    price: 499,
    category: 'Cycling',
    imageUrl: 'https://images.unsplash.com/photo-1541625602330-2277a4c46182?w=800&q=80',
  },
  // ── Chess ──
  {
    id: 's19',
    title: 'Odisha State Chess Championship',
    venue: 'Hotel Swosti, Bhubaneswar',
    date: 'Sat, 8 Mar',
    price: 199,
    category: 'Chess',
    imageUrl: 'https://images.unsplash.com/photo-1529699211952-734e80c4d42b?w=800&q=80',
  },
  {
    id: 's20',
    title: 'Open Rapid Chess Tournament',
    venue: 'KIIT University, Bhubaneswar',
    date: 'Sun, 23 Mar',
    price: 99,
    category: 'Chess',
    imageUrl: 'https://images.unsplash.com/photo-1528819622765-d6bcf132f793?w=800&q=80',
  },
  // ── Basketball ──
  {
    id: 's21',
    title: '3x3 Basketball League Bhubaneswar',
    venue: 'SAI Sports Complex, Bhubaneswar',
    date: 'Sat, 22 Mar',
    price: 149,
    category: 'Basketball',
    imageUrl: 'https://images.unsplash.com/photo-1546519638-68e109498ffc?w=800&q=80',
  },
  // ── Shooting ──
  {
    id: 's22',
    title: 'Odisha Shooting Championship 2026',
    venue: 'Kalinga Stadium Shooting Range, Bhubaneswar',
    date: 'Sat, 5 Apr',
    price: 299,
    category: 'Shooting',
    imageUrl: 'https://media.istockphoto.com/id/1268516316/vector/trap-shooting-aiming-athlete-with-gun-low-polygonal-isolated-vector-illustration-geometric.jpg?s=612x612&w=0&k=20&c=1QSnY-nZXkopXKpIm9RhVCFl54U7qq7tZrslAF7AUj0=',
  },
  // ── Mixed Martial Arts ──
  {
    id: 's23',
    title: 'Super Fight League - Bhubaneswar',
    venue: 'KIIT Stadium, Bhubaneswar',
    date: 'Sat, 19 Apr',
    price: 499,
    category: 'Mixed Martial Arts',
    imageUrl: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=800&q=80',
  },
];