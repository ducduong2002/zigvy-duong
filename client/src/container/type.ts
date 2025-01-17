export interface Register {
  email: string;
  password: string;
  name: string;
}

export interface Login {
  email: string;
  password: string;

}

export  interface User {
  userId: string;
  name: string;
  email: string;
  token: string;
  _id: string
}

export interface UserId extends Omit<User, "email" | "password" | "_id"> {
  userId: string;
}

export interface ApiResponse {
  user: {
    _id: string;
    name: string;
    email: string;
  };
  token: string;
}

export interface Task  {
  userId: string;
  task: string;
  priority: "High" | "Medium" | "Low";
  status: "Pending" | "In Progress" | "Completed";
  date: string;
  _id?: string;
}

export interface EditableCellProps extends React.HTMLAttributes<HTMLElement> {
  editing: boolean;
  dataIndex: string;
  title: any;
  inputType: "number" | "text";
  record: Task;
  index: number;
}