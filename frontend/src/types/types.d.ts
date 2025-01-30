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

export type PartialGame = Partial<Game>;
export type PartialUser = Partial<User>;
