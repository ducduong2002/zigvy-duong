export interface Register {
  email: string;
  password: string;
  name: string;
  _id: string;

}

export interface Login {
  email: string;
  password: string;
  name: string;
  _id: string;

}

export interface User extends Omit<Register, "password"> {
  _id: string;
}

export interface UserId extends Omit<User, "email" | "password" | "_id"> {
  _id: string;
}

export interface ApiResponse {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
}

