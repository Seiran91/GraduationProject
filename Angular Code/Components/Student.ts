// Interface provides type-checking 
// of Student ONLY not creating of this!
// file: Student.ts
export interface Student {
    id: number;
    Name: string;
  }

export interface StudentDetails {
    id: number;
    Name: string;
    Email: string;
    Title: string;
}

export interface User {
  user: string;
  password: string;
}

export interface LoggedUser {
  user: string;
  logged: boolean;
}