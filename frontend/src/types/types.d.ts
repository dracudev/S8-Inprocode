export interface Game {
  platform: string[];
  genre: string[];
  id_game: number;
  title: string;
  year: number;
  photo: string | null;
}

export interface User {
  id_user: number;
  username: string;
  email: string;
  password: string;
  photo: string | null;
  created_at: string;
}

interface Event {
  id_event: number;
  title: string;
  description: string;
  category: string[];
  location: string;
  latitude: number;
  longitude: number;
  start_date: string;
  end_date: string;
  category_color: string;
}

export type PartialGame = Partial<Game>;
export type PartialUser = Partial<User>;
export type PartialEvent = Partial<Event>;
