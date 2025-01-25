export interface Game {
  platform: string[];
  genre: string[];
  id_game: number;
  title: string;
  year: number;
  photo: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface User {
  id_user: number;
  username: string;
  email: string;
  password: string;
  photo: string | null;
  createdAt: string;
  updatedAt: string;
}
