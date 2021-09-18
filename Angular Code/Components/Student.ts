// Interface provides type-checking of object not creating of this!

export interface Student {
    id: number;
    Name: string;
    Email?: string;
    Title?: string;
  }

export interface User {
  user: string;
  password: string;
}

export interface LoggedUser {
  user: string;
  logged: boolean;
}